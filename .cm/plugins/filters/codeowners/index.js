// based on `codeowners-api`
//
// MIT License
// Copyright (c) 2018 Elay Gliksberg
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
    console.log('CODEOWNERS context', { files, pr });
    const fileData = await loadCodeownersFile(pr.author, pr.repo);
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
