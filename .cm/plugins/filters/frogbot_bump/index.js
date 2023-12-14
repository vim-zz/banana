module.exports = (desc) => {
  var [_, from, to] = /Bumps.*from ([\d\.]+[A-Za-zαß]*) to ([\d\.]+[A-Za-zαß]*)/.exec(desc);
  // remove trailing dot on to
  console.log("BANANA frog before", {from, to});
  if (to[to.length - 1] === ".") {
    to = to.slice(0, -1);
  }

  console.log("BANANA frog after", {from, to});
  return [from, to];
}
