import { supplications } from '../src/data/supplications.js';
let n=0;
for (const s of supplications) {
  for (const [i,p] of s.passages.entries()) {
    if (!p.urdu) { console.log('MISSING', s.slug, i); continue; }
    const words = p.urdu.split(/\s+/);
    for (let j=1;j<words.length;j++) {
      if (words[j]===words[j-1] && words[j].length>1) console.log('DUP', s.slug, i, words[j]);
    }
    if (/[[\]()]/.test(p.urdu)) console.log('BRACKET', s.slug, i, p.urdu.match(/[[\]()]/g)?.join(' '));
    if (/[a-zA-Z]{3,}/.test(p.urdu)) console.log('LATIN', s.slug, i, p.urdu.match(/[a-zA-Z]{3,}/g)?.slice(0,4).join(','));
    n++;
  }
}
console.log('passages', n);

