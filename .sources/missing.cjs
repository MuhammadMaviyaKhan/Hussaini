const fs = require('fs')
const path = require('path')

const files = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.jsx')) files.push(full)
  }
}
walk('src')

const used = new Set()
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const matches = text.matchAll(/className=(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/g)
  for (const match of matches) {
    const raw = match[1] || match[2] || match[3] || ''
    for (const token of raw.split(/\s+/)) {
      if (token && !token.includes('${')) used.add(token)
    }
  }
}

const css = fs
  .readdirSync('src/styles')
  .map((file) => fs.readFileSync(path.join('src/styles', file), 'utf8'))
  .join('\n')
const defined = new Set([...css.matchAll(/\.([a-zA-Z_][a-zA-Z0-9_-]*)/g)].map((m) => m[1]))

const missing = [...used].filter((c) => !defined.has(c)).sort()
console.log(missing.join('\n'))
console.error(`missing ${missing.length} of ${used.size} used classes; ${defined.size} defined`)
