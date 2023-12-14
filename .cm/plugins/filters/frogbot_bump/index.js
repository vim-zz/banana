module.exports = (desc) => {
  var [_, from, to] = /Bumps.*from ([\d\.]+[A-Za-zαß]*) to ([\d\.]+[A-Za-zαß]*)/.exec(desc);
  // remove trailing dot on to
  if (to[to.length - 1] === ".") {
    to = to.slice(0, -1);
  }

  return [to, from];
}
