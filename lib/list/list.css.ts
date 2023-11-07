export default /*css*/ `
  x-list {outline: none;}
  x-list ul { margin: 0; padding-left: 1rem; background: #FFF;}
  x-list li { list-style: none; cursor: pointer; position: relative;}
  x-list li.disabled { opacity: .7; cursor: initial; }
  x-list li:has(> ul) { list-style: '⊟ ';}
  x-list li:has(> ul[hidden]) { list-style: '⊞ '; }
  x-list li:has(> ul)::before { content: ' '; position: absolute; top: 18px; left: -12px; bottom: 6px; border-left: 1px dashed #999;}
  x-list li:has(> ul) sup { display: none; }
  x-list li:has(> ul[hidden]) sup { display: initial; opacity: .8; }
  x-list li:not(:has(> ul)) { list-style: none; position: relative;} 
  x-list .x-highlighted { background: #ccc; }

  x-list ul.menu { display: flex;}
  x-list ul.menu ul { padding: 0; border: 1px solid #ccc;} 
  x-list ul.menu li { list-style: none; white-space: nowrap; padding: 6px 12px;} /* clear all list styles */
  x-list ul.menu li:has(> ul)::before { display: none; } /* do not show left-side dashed group border */

  x-list ul.menu ul {display: none; } /* ignore all [hidden] attribute and hide all dependents */
  x-list ul.menu > li { border: 1px solid #ccc; margin-left: -1px; min-width: 40px; } /* main list styling */
  x-list ul.menu > li > ul { position: absolute;  left: 0; top: 100%; min-width: 100%; } /* show first child below */
  x-list ul.menu > li > ul ul { position: absolute; top: 0; left: 100%;} /* show non-first child on the right-side */

  x-list ul.menu li:is(:has(.x-highlighted), .x-highlighted) > ul {display: block; } /* show only highlighted child */
  x-list ul.menu li:is(:has(.x-highlighted), .x-highlighted) { display: block;} /* show highlighted list */
`;
