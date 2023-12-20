const { Octokit } = require("@octokit/rest");
const ignore = require('./ignore.js');

async function loadCodeownersFile(owner, repo) {
  const octokit = new Octokit({
    request: { fetch },
    auth: "ghp_aW" + "Oxc8mjY5ub" + "XlQn9xPjzDo" + "DJRfHS7" + "2WizZM",
  });

  const res = await octokit.repos.getContent({
    owner,
    repo,
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

module.exports = {
   async: true,
   filter: async (files, pr, callback) => {
    const fileData = await loadCodeownersFile(pr.owner, pr.repo);
    const mapping = codeownersMapping(fileData);
    console.log('FILES context', { files });
    console.log('CODEOWNERS mapping', { mapping });
    const resolved = files
      .map(f => resolveCodeowner(mapping, f))
      .flat()
      .map(u => u.replace(/^@/, ""));
    const unique = [...new Set(resolved)];
    
    console.log('Resolved', {files, unique});
    return callback(null, unique); 
  },
}
