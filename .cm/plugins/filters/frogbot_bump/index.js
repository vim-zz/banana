module.exports = (desc) => {
  const [_, from, to] = /Bumps.*from (\S+) to (\S+)/.exec(desc);
  // remove trailing dot on to
  if (to[to.length - 1] === ".") {
    to = to.slice(0, -1);
  }

  return [from, to];
}
