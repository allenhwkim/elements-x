<script lang="typescript">
  import { onMount } from "svelte";

  let data;
  let bootstrapDialog;

  onMount(() => {
    bootstrapDialog= new window['bootstrap'].Modal(document.querySelector('#data-dialog'));
  });
  
  export function show(message: any) {
    data = message;
    bootstrapDialog.show();
  }
</script>

<!-- Data Dialog -->
<div class="modal fade" id="data-dialog" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Data Viewer</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="dialog-contents">
        <b>reactflow data </b>
        <json-viewer level="2" data={data?.reactflowData}></json-viewer>
        <b>reactflow instance</b>
        <json-viewer data={data?.reactflowInstance}></json-viewer>
      </div>
    </div>
  </div>
</div>