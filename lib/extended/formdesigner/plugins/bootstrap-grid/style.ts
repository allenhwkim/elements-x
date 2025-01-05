export default `
  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    padding: 5px !important;
  }

  [class^="col"]{
    float: left;
    min-height: 0.125rem;
  }

  .col-md-1 {
    width: 8.33%;
  }

  .col-md-2 {
    width: 16.66%;
  }

  .col-md-3 {
    width: 24.99%;
  }

  .col-md-4 {
    width: 33.32%;
  }

  .col-md-5 {
    width: 41.65%;
  }

  .col-md-6 {
    width: 49.98%;
  }

  .col-md-7 {
    width: 58.31%;
  }

  .col-md-8 {
    width: 66.64%;
  }

  .col-md-9 {
    width: 74.97%;
  }

  .col-md-10 {
    width: 83.30%;
  }

  .col-md-11 {
    width: 91.63%;
  }

  .col-md-12 {
    width: 99.96%;
  }

  [data-gjs-type='grid-column']:empty:before {
    content: attr(data-size);
    border-radius: 4px;
    background-color: #FAEFFE !important;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  [data-gjs-type='grid-row']:empty:before {
    content: '';
    background-color: #FAEFFE !important;
    min-height: 100px;
    display: block;
  }


  [data-gjs-type='grid-row'] [data-gjs-type='grid-column']:only-child {
    float: none;
  }
`;