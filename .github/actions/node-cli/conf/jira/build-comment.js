module.exports = (links) => {
  return `(${require('os').platform()})\nBuild links:\n ${links.join("\n")}`;
}
