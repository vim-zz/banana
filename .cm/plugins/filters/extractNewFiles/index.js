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

module.exports = extractNewFiles;