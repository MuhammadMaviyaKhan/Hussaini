const fs = require('fs')
const text = fs.readFileSync('src/pages/SupplicationReader.jsx', 'utf8')
const matches = text.matchAll(/className=(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/g)
const used = new Set()
for (const match of matches) {
  const raw = match[1] || match[2] || match[3] || ''
  for (const token of raw.split(/\s+/)) if (token && !token.includes('${')) used.add(token)
}
const css = fs.readdirSync('src/styles').map((f) => fs.readFileSync('src/styles/' + f, 'utf8')).join('\n')
const defined = new Set([...css.matchAll(/\.([a-zA-Z_][a-zA-Z0-9_-]*)/g)].map((m) => m[1]))
console.log([...used].sort().map((c) => `${defined.has(c) ? 'YES' : 'NO '} ${c}`).join('\n'))
