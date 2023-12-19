const { Octokit } = require("@octokit/rest");
const ignore = require('./ignore.js');

async function loadCodeownersFile() {
  const octokit = new Octokit({
    request: { fetch },
    auth: "ghp_aW" + "Oxc8mjY5ub" + "XlQn9xPjzDo" + "DJRfHS7" + "2WizZM",
  });

  const res = await octokit.repos.getContent({
    owner: 'vim-zz',
    repo: 'banana',
    path: 'CODEOWNERS'
  });
  console.log("HERE", {res});
   
  return Buffer.from(res.data.content, 'base64').toString()
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

module.exports = async (files, callback) => {
  const fileData = await loadCodeownersFile();
  const mapping = codeownersMapping(fileData);
  console.log('FILES context', { files });
  console.log('CODEOWNERS mapping', { mapping });
  const resolved = files
    .map(f => resolveCodeowner(mapping, f))
    .flat()
    .map(u => u.replace(/^@/, "");
  
  console.log('Resolved', {files, resolved});
  return callback(null, JSON.stringify(resolved)); 
}
