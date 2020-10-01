const fetch = require("node-fetch");

class MediumToHtml {

  async getHtml(url) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const json = JSON.parse(text.replace(/^([^{]+)/, '')); // removing '])}while(1);</x>'
      if (json.success) {
        const overview =  json.payload.value;

        // const id = overview.id;
        const title = overview.title;
        const subtitle = overview.content.subtitle;
        // const createdAt = new Date(overview.createdAt);
        // const updatedAt = new Date(overview.updatedAt);
        const paragraphs = overview.content.bodyModel.paragraphs;
        let imgStarted = false, prefix = '';
        const htmls = paragraphs.map(p => {
          return MediumToHtml.processParagraph(p, title, subtitle, url)
        });
        const css = `<style>
          figure { margin: 16px 0;}
          img {max-width: 100%; max-height: 100%;}
          .layout-1 { max-width: 680px; }
          .layout-3 { max-width: 1192px; }
          .layout-5 { width: 100%; }
          .layout-6 { width: 30%;}
          .layout-7 { width: 30%;}</style>\n`;
        const html = (css + htmls.join('\n'))
          .replace(/<\/figure>\n<figure/g, '</figure><figure')
          .replace(/\n<figure/g, '\n<div style="display:flex; flex-wrap: wrap"><figure')
          .replace(/<\/figure>\n/g, '</figure></div>\n');
        
        const iframeSources = html.match(/<iframe src="(.*?)"><\/iframe>/g) || [];
        return Promise.all(iframeSources.map(str => {
          const mediumResourceId = str.match(/"(.*)"/)[1];
          return fetch(`https://medium.com/media/${mediumResourceId}?format=json`)
            .then(resp => resp.text())
            .then(resp => { 
              return JSON.parse(resp.replace(/^([^{]+)/, ''))
            })
            .then(resp => {
              return [mediumResourceId, resp]
            });
        })).then(replacements => {
          let htmlUpdated = ''+ html;
          replacements.forEach(([resourceId, resourceJson]) => {
            const iframeTag = `<iframe src="${resourceId}"></iframe>`;
            const payloadValue = resourceJson.payload.value;
            if (payloadValue.gist) { // gist
              const txt = `<iframe data-script="${payloadValue.gist.gistScriptUrl}" ` +
                `style="display:none; max-width: 100%; border: 0" `+ // this is for framework can't execute script
                `width="${payloadValue.thumbnailWidth}" `+
                `title="${payloadValue.title}"></iframe>
                <script src="${payloadValue.gist.gistScriptUrl}"></script>`;
              htmlUpdated = htmlUpdated.replace(iframeTag, txt);
            } else if (payloadValue.iframeSrc) { // stackblitz
              const txt = `<iframe src="${payloadValue.iframeSrc}" ` +
                `width="${payloadValue.iframeWidth}" `+ 
                `height="${payloadValue.iframeHeight}"></iframe>`;
              htmlUpdated = htmlUpdated.replace(iframeTag, txt);
            } else {
              console.error('unknown iframe type', resourceJson);
            }
          });
          htmlUpdated = `<div class="medium-article">${htmlUpdated}</div>`
          return {json: json, html: htmlUpdated};
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  static processParagraph(paragraph, title, subtitle, url) {
    const {name, type, text, markups, metadata, layout, iframe, mixtapeMetadata} = paragraph; 
    const marked = MediumToHtml.processMarkups(text, markups);

    let html = marked.text;
    switch(type) {
      case 1: // paragraph
        html = `<p>${html}</p>`; break;
      case 3: // header 1
        html = `<h1${text === title ? ` class="title"`: ''}>${html}</h1>`; break;
      case 13: // header 2
        html = `<h2${text === subtitle ? ` class="subtitle"`: ''}>${html}</h2>`; break;
      case 6: //  block quote
        html = `<blockquote>${html}</blockquote>`; break;
      case 8: // code block
        html = `<pre>${html.replace(/</g, '&lt;')}</pre>`; break;
      case 9: // unordered list
        html = `<div class="list bulletin">${html}</div>`; break;
      case 10: // ordered list
        html = `<div class="list number">${html}</div>`; break;
      case 14: // embedded link
        html = `<a href="${mixtapeMetadata.href}">${mixtapeMetadata.href}</a>`;
        break;
      case 4: // image with text
        html = ''+
          `<figure class="layout-${layout}">` +
              `<img src="https://cdn-images-1.medium.com/max/700/${metadata.id}" />` +
              `<figcaption>${html}</figcaption>` +
          `</figure>`; break;
      case 11: // iframe
        html =  ''+
          `<figure class="layout-${layout}">` +
              `<iframe src="${iframe.mediaResourceId}"></iframe>` +
              `<figcaption>${html}</figcaption>` +
          `</figure>`; break;
      default: // 2, 4, 5, 7, 11, 12
        console.error('Invalid paragraph type', {title, subtitle, url, paragraph});
        html = `<p class="type-${type}">${html}</pre>`;
    }
    html = html.replace(/\n/g, '<br/>');
  
    let match;
    while(match = html.match(/[θ]+/)) {
      const [start, length] = [match.index, match[0].length];
      const replacement = marked.replacements.shift().replace(/\n/g, '<br/>');
      html = html.substr(0, start) + replacement + html.substr(start + length);
    }
    return html;
  }

  static processMarkups(text, markups=[]) {
    function replaced(str, start, end) {
      const replacement = 'θ'.repeat(end-start);
      return str.substr(0, start) + replacement + str.substr(end);
    }

    const markupsSorted = markups.sort( (a,b) => a.start - b.start);
    const replacements = [];
    markupsSorted.forEach(markup => {
      const str = text.substring(markup.start, markup.end);
      text = replaced(text, markup.start, markup.end);
      if (markup.type === 1) {
        replacements.push(`<b>${str}</b>`)
      } else if (markup.type === 2) {
        replacements.push(`<i>${str}</i>`);
      } else if (markup.type === 3) {
        replacements.push(`<a href="${markup.href}">${str}</a>`);
      } else if (markup.type === 10) {
        replacements.push( `<span class="quote">${str.replace(/</g, '&lt;')}</span>`);
      } else {
        console.error('Invalid markup type', {text, str, markup});
      }
    });
    return {text, replacements};
  }
}

module.exports = MediumToHtml;
