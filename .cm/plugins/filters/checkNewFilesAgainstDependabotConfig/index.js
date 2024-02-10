const { Octokit } = require("@octokit/rest");
const path = require("path");

// function dirname(filepath) {
//     return filepath.split("/").slice(0, -1).join("/");
// }

function extractDirectories(dependabotYmlContent) {
    const lines = dependabotYmlContent.split('\n');
    const directories = [];

    lines.forEach(line => {
        if (line.trim().startsWith('directory:')) {
            // Extract the value after 'directory:'
            const directory = line
                // get the dir name value after the directory key
                .split(':')[1]
                .trim()
                // remove string's double or single quotes
                .replace(/['"]+/g, '')
                // remove comments
                .split('#')[0]
                .trim();
            directories.push(directory);
        }
    });

    return directories;
}

function extractNewFiles(fileDiffs, fileTypeRegexStr) {
    // console.log("Identifying new files...", {fileDiffs, fileTypeRegexStr})
    const fileTypeRegex = new RegExp(fileTypeRegexStr);
    const newFiles = fileDiffs
      .filter(item => item.original_file === "")
      .filter(item => fileTypeRegex.test(item.new_file))
      .map(item => item.new_file);
    console.log("extractNewFiles result", {newFiles});
    return newFiles;
}

async function getRepoFile(repo, path, auth) {
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
    const content = Buffer.from(result.data.content, 'base64').toString();
    console.log("getRepoFile", {content});
    return content;
}

const checkNewFilesAgainstDependabotConfig = async (fileDiffs, repo, fileRegexStr, auth, callback) => {
    const newFiles = extractNewFiles(fileDiffs, fileRegexStr);
    console.log("newFiles", {newFiles});

    const fileContent = await getRepoFile(repo, "dependabot.yml", auth);
    console.log("fileContent", {fileContent});

    const dependabotDirectories = extractDirectories(fileContent);
    console.log("dependabotDirectories", {dependabotDirectories});

    const result = newFiles
        .map(file => '/' + file)
        // check for new files, that are not covered yet, a single matcn is sufficient
        .some(file => {
            // check if the file already covered in the exisintg config
            // a single match of path to directory is sufficient 
            const isCovered = dependabotDirectories.some(x => {
                console.log("checking", {file, x, dir: path.dirname(file)});
                return path.dirname(file) === x;
            });
            return !isCovered;
        });
    console.log("checkNewFilesAgainstDependabotConfig result", {result});
    return callback(null, result);
}

module.exports = {
    async: true,
    filter: checkNewFilesAgainstDependabotConfig
}

