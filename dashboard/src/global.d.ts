/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*.svelte" {
  import type { ComponentType } from "svelte";
  const component: ComponentType;
  export default component;
}

export {IForm, ISubmitData, IUserData, IForms} from '@formflow/elements/src/form-stepper/types';