import { spawn } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import path from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = process.env.SHOTS_DIR || 'C:\\Users\\maviy\\AppData\\Local\\Temp\\opencode\\shots';
const PORT = 9223;
const USER_DIR = 'C:\\Users\\maviy\\AppData\\Local\\Temp\\opencode\\edge-cdp-profile';
const BASE = 'http://localhost:5173';

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error('Usage: node shoot.mjs /route:name [/:name ...]');
  process.exit(1);
}

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

async function shoot(cdp, route, name, { width, height, mobile }) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width, height, deviceScaleFactor: 1, mobile: !!mobile,
  });
  await cdp.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  const loaded = cdp.once('Page.loadEventFired');
  await cdp.send('Page.navigate', { url: BASE + route });
  await loaded;
  await sleep(300);
  await cdp.send('Runtime.evaluate', {
    expression: `document.fonts.ready.then(() => true)`,
    awaitPromise: true,
  });
  await sleep(500);

  // Scroll through the page to trigger whileInView reveals, then return to top.
  await cdp.send('Runtime.evaluate', {
    expression: `(async () => {
      const step = Math.floor(window.innerHeight * 0.7);
      const max = document.documentElement.scrollHeight;
      for (let y = 0; y < max; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 350));
      return document.documentElement.scrollHeight;
    })()`,
    awaitPromise: true,
    returnByValue: true,
  });
  await sleep(700);

  const { result } = await cdp.send('Runtime.evaluate', {
    expression: `Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)`,
    returnByValue: true,
  });
  const fullHeight = Math.min(result.value || height, 16000);
  const shot = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height: fullHeight, scale: 1 },
  });
  const file = path.join(OUT, `${name}.png`);
  const { writeFileSync } = await import('node:fs');
  writeFileSync(file, Buffer.from(shot.data, 'base64'));
  console.log(`saved ${file} (${width}x${fullHeight})`);
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

  const mobile = process.env.MOBILE === '1';
  const width = mobile ? 390 : 1440;
  const height = mobile ? 844 : 900;

  for (const t of targets) {
    const [route, name] = t.split(':');
    await shoot(cdp, route, name, { width, height, mobile });
  }
  ws.close();
} finally {
  edge.kill();
}
