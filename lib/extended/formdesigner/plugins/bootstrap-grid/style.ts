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

  *[data-gjs-type='grid-row']:empty {
    min-height: 100px;
  }

  *[data-gjs-type='grid-row']:empty,
  *[data-gjs-type='grid-column']:empty {
    min-height: 100px;
    position: relative;
    color: inherit;
  }

  *[data-gjs-type='grid-row']:empty:before,
  *[data-gjs-type='grid-column']:empty:before {
    content: '';
    height: calc(100% - 14px);
    background-size: 80% clamp(20px, 50%, 50px);
    background-repeat: no-repeat;
    border-radius: 4px;
    background-position: center;
    z-index: 1;
    background-color: #EADFFE !important;
    border: 2px solid #C6A9FD;
    min-height: 100px;
    margin: 5px;
    display: block;
  }

  *[data-gjs-type^='dm-']:empty:before,
  *[data-gjs-type^='dm-']:empty:after {
    color: #838caa !important;
    /* font-family: Inter, Helvetica, Arial; */
    display: block;
  }

  .gjs-hovered[data-gjs-type='grid-row']:empty:before,
  .gjs-hovered[data-gjs-type='grid-column']:empty:before {
    background-color: #EADFFE !important;
  }

  *[data-gjs-type='grid-row']:empty {
    min-height: 100px;
  }

  [data-gjs-type='grid-row'] [data-gjs-type='grid-column']:only-child {
    float: none;
  }

  *[data-gjs-type='grid-column']:empty:before {
    background-image: url('column-empty-state.svg');
  }`;