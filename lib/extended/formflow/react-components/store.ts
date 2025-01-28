import { create } from 'zustand';
import { UndoRedo } from './undo-redo';

const useStore = create((set) => ({
  nodes: [],
  edges: [],
  undoRedo: false, // used by a subscriber

  setState(params, undoRedo=false) {
    if (params) {
      set(params); // it could be a function or {nodes, edges}
      set({undoRedo});
    }
  },
}));

// Subscribe to state changes
useStore.subscribe( (newState: any, prevState) => {
  const changed = JSON.stringify(newState) !== JSON.stringify(prevState);
  if (changed) {
    const {nodes, edges, undoRedo} = newState;
    !undoRedo && UndoRedo.add({nodes, edges});
  }
});

export default useStore;
