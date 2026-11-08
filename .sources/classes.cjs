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
const classes = new Set()
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const matches = text.matchAll(/className=(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/g)
  for (const match of matches) {
    const raw = match[1] || match[2] || match[3] || ''
    for (const token of raw.split(/\s+/)) {
      if (token && !token.includes('${')) classes.add(token)
    }
  }
}
console.log([...classes].sort().join('\n'))
