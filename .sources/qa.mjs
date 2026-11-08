import { spawn } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import path from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = process.env.SHOTS_DIR || 'C:\\Users\\maviy\\AppData\\Local\\Temp\\opencode\\shots';
const PORT = 9224;
const USER_DIR = 'C:\\Users\\maviy\\AppData\\Local\\Temp\\opencode\\edge-qa-profile';
const BASE = process.env.BASE_URL || 'http://localhost:5173';

const scenarioPath = process.argv[2];
if (!scenarioPath) {
  console.error('Usage: node qa.mjs scenario.json');
  process.exit(1);
}
const scenario = JSON.parse(readFileSync(scenarioPath, 'utf8'));

mkdirSync(OUT, { recursive: true });
rmSync(USER_DIR, { recursive: true, force: true });

const edge = spawn(EDGE, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${USER_DIR}`,
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  'about:blank',
], { stdio: 'ignore' });

async function waitForVersion() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return res.json();
    } catch {}
    await sleep(250);
  }
  throw new Error('CDP did not start');
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.events = new Map();
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      } else if (msg.method) {
        const listeners = this.events.get(msg.method) || [];
        listeners.forEach((fn) => fn(msg.params));
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  on(method, fn) {
    if (!this.events.has(method)) this.events.set(method, []);
    this.events.get(method).push(fn);
  }
  once(method) {
    return new Promise((resolve) => {
      const fn = (params) => {
        const arr = this.events.get(method);
        arr.splice(arr.indexOf(fn), 1);
        resolve(params);
      };
      this.on(method, fn);
    });
  }
}

async function waitLoad(cdp) {
  await sleep(250);
  await cdp.send('Runtime.evaluate', {
    expression: `document.fonts.ready.then(() => true)`,
    awaitPromise: true,
  });
  await sleep(450);
}

try {
  await waitForVersion();
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
  const tab = await res.json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  const cdp = new CDP(ws);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  let width = scenario.width || 1440;
  let height = scenario.height || 900;
  let mobile = scenario.mobile || false;

  async function setViewport() {
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: 1, mobile: !!mobile,
    });
    await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    });
  }
  await setViewport();

  for (const step of scenario.steps) {
    if (step.viewport) {
      [width, height] = step.viewport;
      mobile = !!step.mobile;
      await setViewport();
    }
    if (step.goto) {
      const loaded = cdp.once('Page.loadEventFired');
      await cdp.send('Page.navigate', { url: BASE + step.goto });
      await loaded;
      await waitLoad(cdp);
      await cdp.send('Runtime.evaluate', {
        expression: `window.scrollTo(0, 0)`,
      });
      await sleep(350);
    }
    if (step.scrollTo !== undefined) {
      await cdp.send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${Number(step.scrollTo)}, behavior: 'instant' })`,
      });
      await sleep(step.wait ?? 350);
    }
    if (step.scrollBy !== undefined) {
      await cdp.send('Runtime.evaluate', {
        expression: `window.scrollBy({ top: ${Number(step.scrollBy)}, behavior: 'instant' })`,
      });
      await sleep(step.wait ?? 350);
    }
    if (step.scrollFraction !== undefined) {
      await cdp.send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: document.documentElement.scrollHeight * ${Number(step.scrollFraction)} - window.innerHeight / 2, behavior: 'instant' })`,
      });
      await sleep(step.wait ?? 350);
    }
    if (step.eval) {
      const out = await cdp.send('Runtime.evaluate', {
        expression: step.eval,
        awaitPromise: true,
        returnByValue: true,
      });
      if (out.exceptionDetails) {
        console.error('EVAL ERROR:', out.exceptionDetails.text, out.result?.description || '');
      } else if (step.log) {
        console.log(step.log, JSON.stringify(out.result.value));
      }
      await sleep(step.wait ?? 250);
    }
    if (step.click) {
      const out = await cdp.send('Runtime.evaluate', {
        expression: `(() => { const el = document.querySelector(${JSON.stringify(step.click)}); if (!el) return 'NOT FOUND'; el.click(); return 'clicked'; })()`,
        returnByValue: true,
      });
      if (out.result.value === 'NOT FOUND') console.error('CLICK NOT FOUND:', step.click);
      await sleep(step.wait ?? 500);
    }
    if (step.wait) {
      await sleep(step.wait);
    }
    if (step.shot) {
      const params = { format: 'png' };
      if (step.full) {
        const { result } = await cdp.send('Runtime.evaluate', {
          expression: `Math.min(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), 12000)`,
          returnByValue: true,
        });
        params.captureBeyondViewport = true;
        params.clip = { x: 0, y: 0, width, height: result.value, scale: 1 };
      }
      const shot = await cdp.send('Page.captureScreenshot', params);
      const file = path.join(OUT, `${step.shot}.png`);
      writeFileSync(file, Buffer.from(shot.data, 'base64'));
      console.log(`saved ${file}`);
    }
  }
  ws.close();
} finally {
  edge.kill();
}
