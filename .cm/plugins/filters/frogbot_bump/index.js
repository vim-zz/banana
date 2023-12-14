module.exports = (desc) => {
  const [from, to] = /Bumps.*from (\S+) to (\S+)/.exec(desc);
  return ([from, to]);
}
