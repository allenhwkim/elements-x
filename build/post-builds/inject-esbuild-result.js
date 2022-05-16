const { build } = require('esbuild');
const path = require('path');

module.exports  = function injectEsbuildResult() { 

  return function(buildOptions, buildResult) {
    const fs = buildOptions.write ? require('fs') : require('memfs');

    // write build result, e.g. main.js, to outdir if write is false
    if (!buildOptions.write) {
      fs.mkdirSync(path.join(process.cwd(), buildOptions.outdir), {recursive: true});
      buildResult.outputFiles.forEach(file => {
        if (file.path.startsWith('/')) {
          fs.writeFileSync(file.path, file.contents) 
        } else {
          const filePath = path.join(process.cwd(), buildOptions.outdir, file.path);
          fs.writeFileSync(filePath, file.contents) 
        }
      });
    }

    // get html to inject to the end of <body> of index.html
    const buildFileNames = buildResult.outputFiles ?
    buildResult.outputFiles.map(el => el.path) : Object.keys(buildResult.metafile.outputs);
    const htmlToInject = buildFileNames.map(fileName => {
        const path = fileName.split('/').slice(-1)[0];
        const ext = path.match(/\.([a-z]+)$/)[1];
        return ext === 'js' ? `<script src="${path}"></script>` :
              ext === 'css' ? `<link rel="stylesheet" href="${path}" />` : '';
      }).join('');
      
    // update index.html
    const srcIndexPath = path.join(process.cwd(), 'src', 'index.html');
    const outIndexPath = path.join(buildOptions.outdir, 'index.html');
    const contents = require('fs').readFileSync(srcIndexPath, {encoding: 'utf8'})
      .replace(/<\/body>/, `${htmlToInject}\n</body>`);
    fs.writeFileSync(outIndexPath, contents);

    console.info(`[esbuild-x inject-esbuild-results] ${htmlToInject} into ${outIndexPath}`);

    return outIndexPath;
  }

}