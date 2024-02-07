function extractDirectories(dependabotYmlContent) {
    const lines = dependabotYmlContent.split('\n');
    const directories = [];

    lines.forEach(line => {
        if (line.trim().startsWith('directory:')) {
            // Extract the value after 'directory:'
            const directory = line.split(':')[1].trim().replace(/['"]+/g, '');
            directories.push(directory);
        }
    });

    return directories;
}

function lookForDependabotStuff(newFiles, dependabotYmlContent) {
    const dependabotDirectories = extractDirectories(dependabotYmlContent);
    const result = newFiles
        .map(file => '/' + file)
        .some(file => dependabotDirectories.some(x => file.startsWith(x)));
    console.log("lookForDependabotStuff result", {result});
    return result;
}

module.exports = lookForDependabotStuff;
