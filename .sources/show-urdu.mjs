import { supplications } from '../src/data/supplications.js';
for (const [slug, idx] of [['dua-kumayl',6],['dua-nudbah',6],['dua-faraj',3],['ziyarat-waritha',3]]) {
  const s = supplications.find(x=>x.slug===slug);
  console.log('\n---', slug, idx, '---');
  console.log('EN:', s.passages[idx].english);
  console.log('UR:', s.passages[idx].urdu);
}
