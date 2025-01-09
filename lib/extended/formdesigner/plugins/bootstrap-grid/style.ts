export default `
  /* show some space when .column is empty */
  .row > .col:empty:before {
    content: attr(data-size);
    display: flex;
    min-height: 100px;
    height: 100%;
    border-radius: 4px;
    background-color: #FAEFFE !important;
    align-items: center;
    justify-content: center;
  }

  /* show some space when .row is empty */
  .row:empty:before {
    content: '';
    background-color: #FAEFFE !important;
    height: 100%;
    min-height: 100px;
    display: block;
    width: 100%;
  }
  
  :not(.container) > .row {
    --bs-gutter-x: 0;
  }
`;