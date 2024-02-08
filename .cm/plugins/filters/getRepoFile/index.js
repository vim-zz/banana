const { Octokit } = require("@octokit/rest");

/**
 * @module getRepoFile
 * @description 
 * @param {string} Input - The repo object
 * @param {string} path - The path of the file to retrieve
 * @param {string} auth - The access token with repo:read scope, used to read the file
 * @returns {string} - The text of the specified file.
 * @example {{ repo | getRepoFile(path, env.GITHUB_SECRET) }}
 * @license MIT
 */

const getRepoFile = async (repo, path, auth, callback) => {
    authString = String(auth);
    console.log (repo.owner, repo.name, path, authString)
    const octokit = new Octokit({
        request: { fetch },
        auth: authString,
    });

    const result = await octokit.repos.getContent({
        owner: repo.owner,
        repo: repo.name,
        path
    });
    const contentData = Buffer.from(result.data.content, 'base64').toString();
    const content = JSON.stringify(contentData);
    console.log("getRepoFile", {content});
    return callback(null, JSON.stringify(content));
}

module.exports = {
    async: true,
    filter: getRepoFile
}