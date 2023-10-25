import { defineAll } from '@formflow/elements/src';
import App from './app.svelte';

defineAll();

const app = new App({target: document.body});
export default app
