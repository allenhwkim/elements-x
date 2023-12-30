import { fixIndent } from "../../../../util";

export default {
  id: 'bs5-alert',
  category: 'Bootstrap5 Components',
  label: 'Alert', 
  content: fixIndent(`
    <div class="alert alert-primary d-flex align-items-center" role="alert">
      <i class="fa-solid fa-circle-check fs-5 me-2" aria-hidden="true"></i>
      A simple primary alert with 
      <a href="#" class="alert-link">an example link</a>.
      Give it a click if you like.
    </div>
`)
}