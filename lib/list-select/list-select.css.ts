export default /*css*/ `
  list-select ul { margin: 0; padding-left: 1rem; background: #FFF;}
  list-select li { list-style: none; cursor: pointer; position: relative;}
  list-select li.disabled { opacity: .7; cursor: initial; }
  list-select li:has(> ul) { list-style: '⊟ ';}
  list-select li:has(> ul[hidden]) { list-style: '⊞ '; }
  list-select li:has(> ul)::before { content: ' '; position: absolute; top: 18px; left: -12px; bottom: 6px; border-left: 1px dashed #999;}
  list-select li:has(> ul) sup { display: none; }
  list-select li:has(> ul[hidden]) sup { display: initial; opacity: .8; }
  list-select li:not(:has(> ul)) { list-style: none; position: relative;} 
  list-select .x-highlighted { background: #ccc; }

  list-select ul.menu { display: flex;}
  list-select ul.menu ul { padding: 0; border: 1px solid #ccc;} 
  list-select ul.menu li { list-style: none; white-space: nowrap; padding: 6px 12px;} /* clear all list styles */
  list-select ul.menu li:has(> ul)::before { display: none; } /* do not show left-side dashed group border */

  list-select ul.menu ul {display: none; } /* ignore all [hidden] attribute and hide all dependents */
  list-select ul.menu > li { border: 1px solid #ccc; margin-left: -1px; min-width: 40px; } /* main list styling */
  list-select ul.menu > li > ul { position: absolute;  left: 0; top: 100%; min-width: 100%; } /* show first child below */
  list-select ul.menu > li > ul ul { position: absolute; top: 0; left: 100%;} /* show non-first child on the right-side */

  list-select ul.menu li:is(:has(.x-highlighted), .x-highlighted) > ul {display: block; } /* show only highlighted child */
  list-select ul.menu li:is(:has(.x-highlighted), .x-highlighted) { display: block;} /* show highlighted list */
`;
