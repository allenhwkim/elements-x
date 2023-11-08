export default /*css*/ `
  x-clock {
    display: inline-block;
    /* position: relative; //This affects offsetX/Y. Don't */
    width: 160px;
    height: 160px;
    text-align: center;
    vertical-align: top;
  }
  
  x-clock .x-clock {
    width: 100%;
    height: 100%;
  }

  x-clock .x-clock .x-clock-second-hand {
    display: none;
  }

  x-clock[run] .x-clock .x-clock-second-hand {
    display: initial;
  }

`;