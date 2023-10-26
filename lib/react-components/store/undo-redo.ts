import structuredClone from "@ungap/structured-clone";

export const UndoRedo = {
  debugMode: 0,
  maxHistory: 50,
  history: [] as any[],
  position: 0,
  
  reset(item: any): void {
    this.history = [structuredClone(item)];
    this.position = 0;
  },

  canUndo(): boolean { 
    return this.position > 0;  
  },

  canRedo(): boolean{ 
    return this.position < this.history.length-1; 
  },

  undo(): any | undefined {
    if (this.canUndo()) {
      this.position--;
      this.debug('undo');
      return this.history[this.position];
    }
  },

  redo(): any | undefined {
    if (this.canRedo()) {
      this.position++;
      this.debug('redo');
      return this.history[this.position];
    }
  },

  addHistory(item: any): void {
    this.history = 
      this.history.slice(0, this.position + 1)
        .concat(structuredClone(item))
        .slice(-this.maxHistory);
    this.position = this.history.length - 1;
    this.debug('addHistory');
  },

  debug(cmd: string): void {
    if (!this.debugMode) return;
    const {history, position} = this;
    const ret = ['undo','redo'].indexOf(cmd) !== -1 ?
       '=> ' + this.history[this.position] : '';
    const canUndo = this.canUndo();
    const canRedo = this.canRedo();
    console.debug('UndoRedo', cmd, {history, position, canUndo, canRedo}, ret);
  }
};

// for (var i=0; i<90; i++) 
//   UndoRedo.addHistory(i);
// for (var i=0; i<90; i++) 
//   UndoRedo.undo();

// UndoRedo.addHistory(41);
// UndoRedo.addHistory(42);
// UndoRedo.addHistory(43);
// UndoRedo.addHistory(44);

// UndoRedo.undo(); // 43
// UndoRedo.undo(); // 42
// UndoRedo.undo(); // 41
// UndoRedo.undo(); // 40
// UndoRedo.undo();
// UndoRedo.undo();

// UndoRedo.redo(); // 41
// UndoRedo.redo(); // 42
// UndoRedo.redo(); // 43
// UndoRedo.redo(); // 44
// UndoRedo.redo();
// UndoRedo.redo();


// UndoRedo.undo(); // 43
// UndoRedo.undo(); // 42
// UndoRedo.addHistory(50);
// UndoRedo.addHistory(60);
// UndoRedo.addHistory(70);

// UndoRedo.undo(); // 60
// UndoRedo.undo(); // 50
// UndoRedo.undo(); // 42
// UndoRedo.undo(); // 41
// UndoRedo.undo(); // 40
// UndoRedo.undo();

// UndoRedo.redo(); // 41
// UndoRedo.redo(); // 42
// UndoRedo.redo(); // 50
// UndoRedo.redo(); // 60
// UndoRedo.redo(); // 70
// UndoRedo.redo();