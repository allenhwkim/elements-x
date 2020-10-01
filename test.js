  function processMarkups(text, markups) {
    function replaced(str, start, end) {
      const replacement = 'θ'.repeat(end-start);
      return str.substr(0, start) + replacement + str.substr(end);
    }

    const replacements = [];
    markups.forEach(markup => {
      const str = text.substring(markup.start, markup.end);
      text = replaced(text, markup.start, markup.end);
console.log({str, text});
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

markups = [ 
  { "type": 3, "start": 97, "end": 134, "href": "https://twitter.com/allenhwkim", "title": "", "rel": "noopener nofollow", "anchorType": 0 },
  { "type": 1, "start": 0, "end": 41 },
  { "type": 1, "start": 42, "end": 57 },
  { "type": 1, "start": 97, "end": 121 }
];
text = "Do you think this useful? If so please;\n* Clap 👏 button below️ to let others to see this too.\n* Follow Allen on Twitter (@allenhwkim)";

console.log(text);
console.log(processMarkups(text, markups).text);
console.log(processMarkups(text, markups).replacements);

