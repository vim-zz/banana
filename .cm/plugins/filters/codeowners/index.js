const { Octokit } = require("@octokit/rest");
const ignore = require('./ignore/index.js');

async function loadCodeownersFile(owner, repo, auth) {
  const octokit = new Octokit({
    request: { fetch },
    auth,
  });

  const res = await octokit.repos.getContent({
    owner,
    repo,
    path: 'CODEOWNERS'
  });
   
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
   filter: async (files, pr, token, callback) => {
    console.log('CODEOWNERS context', { files, pr });
    const fileData = await loadCodeownersFile(pr.author, pr.repo, token);
    const mapping = codeownersMapping(fileData);
    console.log('CODEOWNERS mapping', { mapping });
    
    const resolved = files
      .map(f => resolveCodeowner(mapping, f))
      .flat()
      .filter(i => typeof i === 'string')
      .map(u => u.replace(/^@/, ""));

    const unique = [...new Set(resolved)];
    
    console.log('CODEOWNERS resolved', {unique});
    return callback(null, unique); 
  },
}
