<script lang="typescript">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { FormDiagram } from '@formflow/elements/src';
  import { AppStorage } from '@formflow/elements/src';
  import currentFile from './store';
  import { CurrentFile } from './current-file';

  let message: string;
  let fileName: string;
  let bootstrapDialog: any;

  const dispatch = createEventDispatcher();

  onMount(() => {
    bootstrapDialog= new (window as any).bootstrap.Modal(document.querySelector('#file-dialog'));
  });

  export function show(param: any) {
    message = param;
    bootstrapDialog.show();
  }

  function getAllFiles() {
    return AppStorage.getItem('formflows') || [];
  }
  
  function openFile(formFile: any) { // file dialog event handler
    const chartEl: FormDiagram = $currentFile.chartEl;
    $currentFile = new CurrentFile(formFile, chartEl);
    message = `File ${$currentFile.name} opened`;
  }

  function saveFileAs() {
    const allFormflows = AppStorage.getItem('formflows') || []; // returns array
    const index = allFormflows.findIndex( el => el.name === fileName);
    const confirmed = index === -1 ? 
      true : window.confirm(`The same file name "${fileName}" already exists. Do you want to overwrite?`);
    if (confirmed) {
      $currentFile.name = fileName;
      $currentFile.save();
      $currentFile.modified = false;
      message = `Saved file as "${fileName}"`;
    }
  }
</script>

<style>
  input:not(:valid) + button { opacity: .7; cursor:auto; pointer-events: none; }
</style>

<!-- Data Dialog -->
<div class="modal fade" id="file-dialog" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">File Dialog</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="dialog-contents">
      {#if message ==='LIST_ALL_FILES'}
        {#if getAllFiles().length}
          <ul>
            {#each getAllFiles() as file}
              <li>
                nodes: {file.chart.nodes.length}, edges: {file.chart.edges.length}
                <button on:click={() => openFile(file)}>{file.name}</button>
              </li>
            {/each}
          </ul>
        {:else}
          No items to display
        {/if}
      {:else if message==='GET_FILE_NAME'}
        <input bind:value={fileName} required>
        <button on:click={saveFileAs}>Save</button>
      {:else if message}
        {message}
      {/if}
      </div>
    </div>
  </div>
</div>