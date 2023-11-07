export default /*css*/ `
  @keyframes appear {
    0% {
      opacity: 0
    }

    100% {
      opacity: 1
    }
  }

  [x][data-tooltip-left]:is(:hover, :focus):before {
    content: attr(data-tooltip-left);
    margin-left: -16px
  }

  [x][data-tooltip]:is(:hover, :focus):before {
    content: attr(data-tooltip);
    margin-left: -60px
  }

  [x]:is([data-tooltip], [data-tooltip-left]) {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted #333
  }

  [x]:is([data-tooltip], [data-tooltip-left]):is(:hover, :focus)::before {
    white-space: nowrap;
    min-width: 120px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 6px;
    position: absolute;
    z-index: 1;
    top: calc(100% + 12px);
    left: 50%;
    animation: appear .3s
  }

  [x]:is([data-tooltip], [data-tooltip-left]):is(:hover, :focus)::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -6px;
    border-width: 6px;
    z-index: 1;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #333 rgba(0, 0, 0, 0)
  }

  [x][data-tooltip] {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted #333
  }

  [x][data-tooltip]:hover::before {
    content: attr(data-tooltip);
    min-width: 120px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 6px;
    position: absolute;
    z-index: 1;
    top: calc(100% + 12px);
    left: 50%;
    margin-left: -60px;
    animation: appear .3s
  }

  [x][data-tooltip]:hover::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -6px;
    border-width: 6px;
    z-index: 1;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #333 rgba(0, 0, 0, 0)
  }`;
