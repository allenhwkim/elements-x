# form-flow

Mono-repo using npm workspaces with the following packages

* **dashboard**: Integrate all functionalities of form flows
  * Show form diagrams
  * Edit each form node-data or edge-data
  * Show form editor
  * Run(preview) form app.
  * Handles server-side activity

* **elements**: Collection of custom elements including
  * form-diagram: Show steps of all forms graphically using Reactflow
  * form-designer: Grapejs form editor with bootstrap5 style
  * form-stepper: Show steps of all forms in HTML
    * **forms-controller**: Updates these; 
      * form-stepper
      * form errors section
      * form user section
      * buttons section(review/submit/next/prev)

