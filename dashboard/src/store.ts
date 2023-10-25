import { writable } from 'svelte/store';
import { CurrentFile } from './current-file';

const currentFile = new CurrentFile();

export default writable(currentFile);