import { fixIndent } from "../../../../util";

export default {
  id: 'bs5-accordion',
  category: 'Bootstrap5 Components',
  label: 'Accordion', 
  content: `
<div class="accordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#contents-1" >
        Head #1 with &lt;button data-bs-target="#contents-1">
      </button>
    </h2>
    <div id="contents-1" class="accordion-collapse collapse show" data-bs-parent=".accordion">
      <div class="accordion-body">
        Contents #1 has this structure<br/> 
        &lt;div id="contents-1"><br/>
        &nbsp; &lt;div class="accordion-body>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#contents-2" >
        Head #2 with &lt;button data-bs-target="#contents-2">
      </button>
    </h2>
    <div id="contents-2" class="accordion-collapse collapse show" data-bs-parent=".accordion">
      <div class="accordion-body">
        Contents #2 has this structure<br/> 
        &lt;div id="contents-2"><br/>
        &nbsp; &lt;div class="accordion-body>
      </div>
    </div>
  </div>

</div>
  `,
}