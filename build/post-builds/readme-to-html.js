const marked = require('marked');
const path = require('path');

module.exports = function readmeToHtml(readMePath, htmlPath) {
  readMePath = readMePath || path.join(process.cwd(), 'README.md'); 
  htmlPath = htmlPath || path.join(process.cwd(), 'dist/readme.html'); 

  return function(buildOptions, buildResult) {
    const fs = buildOptions.write ? require('fs') : require('memfs');
    const markdown = require('fs').readFileSync(readMePath, 'utf8');

    const html = marked.parse(markdown).replace(/<br>/g, '<br/>');
    fs.writeFileSync(htmlPath, html);
    console.info(`[esbuild-x readme-to-html] ${readMePath} into ${htmlPath}`);
  }
}
