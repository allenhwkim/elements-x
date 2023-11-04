export default `
  x-json-viewer ul ul { border-left: 1px dashed black; padding-left: 2rem;  margin-left: -12px;}
  x-json-viewer ul li { cursor: initial; }
  x-json-viewer ul li small { opacity: .7; }
  x-json-viewer ul li:has(> ul.hidden) { list-style: '⊞ ' }
  x-json-viewer ul li:has(> ul) { list-style: '⊟ '; cursor: pointer; }
  x-json-viewer ul li:has(> ul) sup { display: none; }
  x-json-viewer ul li:has(> ul.hidden) sup { display: initial; opacity: .8; }
  x-json-viewer ul.hidden { display: none; }
`;

