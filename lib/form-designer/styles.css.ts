/*
  +--------------------------------------------+
  |  .panel__top                               |
  +--------------------------------------------+
  +--------------------------------------------+
  |  .editor-row                               | 
  | +-----------+ +--------------------------+ |
  | | .side-bar | | .editor-canvas           | |
  | |           | |                          | |
  | +-----------+ +--------------------------+ |
  +--------------------------------------------+
*/
// extension es6-string-css for vscode
export default /* css */ `
form-designer {
  position: relative;
  display: block;
  margin: 0 auto;
  height: 720px;
}
form-designer :is(.gjs-category-title, .gjs-layer-title, .gjs-block-category .gjs-title, .gjs-sm-sector-title) {
  padding: 4px;
  font-size: 14px;
}

form-designer .panel__top {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 2rem;
}

form-designer .panel__top > * {
  position: initial; /* override position: absolute */
  padding: 0 4px; /* override padding: 5px */
}

form-designer .editor-row {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

form-designer .editor-row .side-bar {
  flex-basis: 230px;
  border-right: 2px solid #CCC;
  position: relative;
  overflow-y: auto;
}

form-designer .editor-row .side-bar .gjs-block {
  min-height: auto;
  margin: 4px;
  padding: 6px 12px;
  width: 96px;
  white-space: nowrap;
}

form-designer .editor-row .side-bar .gjs-block .gjs-block-label {
  font-size: 12px;
}

form-designer .editor-row .side-bar .tabs.panel__switcher {
  position: initial;
  display: flex;
}

form-designer .editor-row .side-bar .tabs.panel__switcher .gjs-pn-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

form-designer .editor-row .editor-canvas {
  flex-grow: 1;
}

form-designer .editor-row .editor-canvas .gjs-cv-canvas {
  width: 100%;
}
`;