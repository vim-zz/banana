module.exports = (json) => {
  console.log("JSON", {json});
  console.log("JSON PARSE", JSON.parse(json));
  return JSON.stringify(JSON.parse(json));
}
