export default `
  x-json ul ul { border-left: 1px dashed black; padding-left: 2rem;  margin-left: -12px;}
  x-json ul li { cursor: initial; }
  x-json ul li small { opacity: .7; }
  x-json ul li:has(> ul.hidden) { list-style: '⊞ ' }
  x-json ul li:has(> ul) { list-style: '⊟ '; cursor: pointer; }
  x-json ul li:has(> ul) sup { display: none; }
  x-json ul li:has(> ul.hidden) sup { display: initial; opacity: .8; }
  x-json ul.hidden { display: none; }
`;

