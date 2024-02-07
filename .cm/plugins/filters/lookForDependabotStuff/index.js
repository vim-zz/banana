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
    return newFiles.some(file => dependabotDirectories.some(x => file.startsWith(x)));
}

module.exports = lookForDependabotStuff;
