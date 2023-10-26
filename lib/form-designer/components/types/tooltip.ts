export const tooltipType = {
  isComponent: el => {
    return el.getAttribute && (el.getAttribute('data-tooltip') !== null);
  },
  model: {
    defaults: {
      attributes: { class: 'tooltip-bottom' },
      styles: `
        [data-tooltip] {
          position: relative;
          text-decoration: underline dotted;
          cursor: help;
        }
        
        [data-tooltip]::before,
        [data-tooltip]::after {
          position: absolute;
          opacity: 0;
          visibility: hidden;
          transition: opacity .3s ease-in-out;
        }
        
        [data-tooltip]:hover::before,
        [data-tooltip]:hover::after {
          opacity: 1;
          visibility: visible;
          // top: 100%;
        }
        
        [data-tooltip]::before {
          content: attr(data-tooltip);
          z-index: 2;
          // width: 210px;
          max-width: 200px;
          min-width: 120px;
          color: #fff;
          background: rgba(0,0,0, .7);
          border-radius: 5px;
          padding: 5px;
        }
        
        [data-tooltip]::after {
          content: "";
          width: 0;
          height: 0;
        }
        
        [data-tooltip].tooltip-bottom::before,
        [data-tooltip].tooltip-bottom::after {
          top: 100%;
          left: 50%;
          transform: translate(-50%);
          margin-top: 15px;
        }
        
        [data-tooltip].tooltip-bottom::after {
          margin-top: 8px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 7px solid rgba(0,0,0, .7);
        }
        
        [data-tooltip].tooltip-top::before,
        [data-tooltip].tooltip-top::after {
          bottom: 100%;
          left: 50%;
          transform: translate(-50%);
          margin-bottom: 15px;
        }
        
        [data-tooltip].tooltip-top::after {
          margin-bottom: 8px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 7px solid rgba(0,0,0, .7);
        }
        
        [data-tooltip].tooltip-right::before,
        [data-tooltip].tooltip-right::after {
          top: 50%;
          left: 100%;
          transform: translate(0, -50%);
          margin-left: 15px;
        }
        
        [data-tooltip].tooltip-right::after {
          margin-left: 8px;
          border-top: 5px solid transparent;
          border-right: 7px solid rgba(0,0,0, .7);
          border-bottom: 5px solid transparent;
        }
        
        [data-tooltip].tooltip-left::before,
        [data-tooltip].tooltip-left::after {
          top: 50%;
          right: 100%;
          transform: translate(0, -50%);
          margin-right: 15px;
        }
        
        [data-tooltip].tooltip-left::after {
          margin-right: 8px;
          border-top: 5px solid transparent;
          border-left: 7px solid rgba(0,0,0, .7);
          border-bottom: 5px solid transparent;
        }
      `,
    },
  },
}