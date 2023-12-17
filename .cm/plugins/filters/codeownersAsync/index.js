const fs = require('fs').promises;
const ignore = require('./ignore.js');

async function loadCodeownersFile() {
  const data = await fs.readFile("CODEOWNERS", "utf8");
  return Buffer.from(data);
}

function codeownersMapping(data) {
  return data
    .toString()
    .split('\n')
    .filter(x => x && !x.startsWith('#'))
    .map(x => x.split("#")[0])
    .map(x => {
        const line = x.trim();
        const [path, ...owners] = line.split(/\s+/);
        return {path, owners};
    });
}

function resolveCodeowner(mapping, file) {
    const match = mapping
      .slice()
      .reverse()
      .find(x =>
          ignore()
              .add(x.path)
              .ignores(file)
      );
    if (!match) return false;
    return match.owners;
}

module.exports = async (pr, callback) => {
  const fileData = await loadCodeownersFile();
  const mapping = codeownersMapping(fileData);
  console.log('CODEOWNERS mapping', mapping);
  const resolved = pr.files
    .map(f => resolveCodeowner(mapping, f))
    .flat(); 
  
  console.log('Resolved', {files, resolved});
  return callback(null, resolved); 
}
