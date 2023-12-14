module.exports = (desc) => {
  const [_, from, to] = /Bumps.*from (\S+) to (\S+)/.exec(desc);
  return ([from, to]);
}
