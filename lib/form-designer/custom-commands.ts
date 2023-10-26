export const showSidePanel = function(selector) {
  return {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getLayersEl(row) { return row.querySelector(selector) },
  
    run(editor, sender) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = '';
    },
    stop(editor, sender) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = 'none';
    },
  }
}
