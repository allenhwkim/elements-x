// Ref. 
// https://allenhwkim.medium.com/simplest-undo-redo-from-the-scratch-264063d24554
// https://codesandbox.io/p/sandbox/y4xwsj
export const UndoRedo = {
  actions: [] as any[], // undo/redo items
  actionNdx: 0, // current undo/redo position
  
  reset(action:any) {
    this.actions = Array.from(action);
  },

  setIndex(inc: number) {
    const [min, max] = [0, this.actions.length-1]; 
    this.actionNdx = this.actionNdx + inc;
    if (this.actionNdx < min) {
      this.actionNdx = min;
    } else if (this.actionNdx > max) {
      this.actionNdx = max;
    } else {
      return true;
    }
  },

  undo() {
    if (this.setIndex(-1)) {
      const action = this.actions[this.actionNdx];
      console.log('undo-redo undo', this.actions, this.actionNdx);
      return action;
    };
  },

  redo(){
    if (this.setIndex(+1)) {
      const action = this.actions[this.actionNdx];
      console.log('undo-redo redo', this.actions, this.actionNdx);
      return action;
    }
  },

  debounceMs: 500, 
  timeout: 0,
  add(action:any){
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.actions = [...this.actions.slice(0, this.actionNdx+1), action];
      this.setIndex(+1);
      console.log('undo-redo add', this.actions, this.actionNdx);
    }, this.debounceMs) as any;
  }
}