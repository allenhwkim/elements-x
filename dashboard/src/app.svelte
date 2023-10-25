<script lang='ts'>
  import { AppStorage, MonacoEditor, type FormDesigner, type FormDiagram, type IReactflowEvent } from '@formflow/elements/src';
  import { onMount } from 'svelte';

  import AppSideBar from './app-sidebar.svelte';
  import AppDataDialog from './app-data.dialog.svelte';
  import AppFileDialog from './app-file.dialog.svelte';
  import currentFile from './store';
  import equal from 'fast-deep-equal';
  import { setForm } from './app';

  // custom elements
  let chartEl: FormDiagram;
  let menuEl: AppSideBar;
  let formDesigner: FormDesigner;
  let monacoEditor: MonacoEditor;
  let appDataDialog: AppDataDialog;
  let appFileDialog: AppFileDialog;

  function formPropsChanged(e: any) {
    console.log(e.detail);
  }

  $: selectedId = $currentFile.selected?.id;
  $: selectedType = $currentFile.selected?.source ? 'EDGE' : 'NODE';
  $: selectedLabel = $currentFile.selected?.data?.label || $currentFile.selected?.label || '';

  onMount(() => {
    $currentFile.setChartEl(chartEl);
    formDesigner.on('update', function() {  // html is updated
      const html = formDesigner.getHtml().replace(/^<body>/,'').replace(/<\/body>$/,''); 
      selectedType === 'NODE' && chartEl.updateNodeData(selectedId, {html})
    });
  });

  function handleSideBarMessage(event: any) {
    const {dataMessage, fileMessage} = event.detail;
    fileMessage && appFileDialog.show(fileMessage);
    dataMessage && appDataDialog.show(dataMessage);
  }

  function showTab(id) {
    const nodeEdgeDataSection: any = document.querySelector('.accordion-item:has(#node-edge-data)');
    const formDesignerSection: any = document.querySelector('.accordion-item:has(#form-designer)');
    const bootstrap = (window as any).bootstrap;
    if (id === 'node-edge-data') {
      formDesignerSection.style.display = 'none';
      nodeEdgeDataSection.style.height = '100%';
    } else {
      formDesignerSection.style.display = '';
      nodeEdgeDataSection.style.height = 'auto';
    }
    
    // collapse all bootstrap accordions, then show only selected one
    document.querySelectorAll('.collapse.show').forEach(el => new bootstrap.Collapse(el));
    new bootstrap.Collapse(document.getElementById(id));
  }

  function handleReactflowEvent(e: {detail: IReactflowEvent}) {
    const {action, type, node, edge} = e.detail;
    if (action === 'init') { // when init, select the start node
      showTab('node-edge-data');
      const {nodes, edges} = chartEl.getData();
      const node = nodes.find(el => el.id === 'start');
      chartEl.fireEvent({action: 'selected', type: 'node', node, nodes, edges})
    } else if (action === 'selected') { 
      $currentFile.selected = node || edge;

      const editorValue = 
        node?.data?.props || edge?.data?.props || {id: node?.id || edge?.id};
      monacoEditor.setValue(JSON.stringify(editorValue, null, '  '));
      if (node?.type === 'start') {
        showTab('node-edge-data');
      } else if (node?.type === 'end') {
        showTab('node-edge-data');
      } else if (edge?.type === 'custom') {
        showTab('node-edge-data');
      } else if (edge?.type === 'custom') {
      } else if (node?.type === 'custom') {
        showTab('form-designer');
        if (!equal($currentFile.chart, chartEl?.getData())) {
          $currentFile.modified = true;
          $currentFile.chart = chartEl?.getData();
        }

        const nodes = chartEl.getData().nodes;
        const nodeIndex = nodes.findIndex(el => el.id == node.id) as number;
        const html = nodes[nodeIndex].data.html;
        setForm(chartEl?.getData(), node, html); // set stepper, html, css
      }
    } else if (action === 'change' && type === 'chart') {
      AppStorage.setItem('currentFormflow.chart', chartEl.getData());
    }
  }
</script>

<style lang="scss">
  #node-edge-data { height: 100%; }
  .accordion-body { height: 100%; }
  #node-edge-data monaco-editor { height: 100%; }
</style>

<svelte:window on:resize={() => chartEl.getInstance().fitView()} />

<button data-x-target="sidebar" class="position-absolute top-0 start-0 border-0 fs-4" style="z-index: 1">☰</button>
<h1 hidden>Form Flow Dashboard</h1> <!--for a11y-->

<AppSideBar bind:this={menuEl} 
  on:message={handleSideBarMessage}
></AppSideBar>

<resize-divs width class="h-100" on:resize-move={() => chartEl.getInstance().fitView()}>
  <div class="position-relative" style="width: 33%">
    <form-diagram bind:this={chartEl} 
      on:reactflow={handleReactflowEvent}>
    </form-diagram>
  </div>
  <div class="accordion flex-fill" id="right-section" role="navigation">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#node-edge-data">
           Properties of {selectedType.toLowerCase()} "{$currentFile?.name || 'Untitled'}" - "{selectedLabel}"
        </button>
      </h2>
      <div id="node-edge-data" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body">
          <monaco-editor 
            bind:this={monacoEditor}
            on:monaco-change={formPropsChanged}
            data-language="json"
          ></monaco-editor>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#form-designer">
          Form Designer 
        </button>
      </h2>
      <div id="form-designer" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body p-0 py-1">
          <form-designer bind:this={formDesigner}></form-designer>
        </div>
      </div>
    </div>
  </div>
</resize-divs>

<AppDataDialog bind:this={appDataDialog}></AppDataDialog>
<AppFileDialog bind:this={appFileDialog}></AppFileDialog>
