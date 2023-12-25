// <div class="tooltip" title="I'm a tooltip">
//   Tooltip
// </div>
// <style>
// @keyframes fadeIn {
//   0% { opacity: 0;}
//   100% { opacity: 1;}
// }

// .tooltip {
//   position: relative;
// }

// .tooltip:hover::before {
//   content: "";
//   position: absolute;
//   transform: rotate(45deg);
//   background: #192733;
//   padding: 5px;
//   z-index: 1;
//   left: 24px;
//   top: 100%;
//   animation: fadeIn 1s;
// }

// .tooltip:hover::after {
//   content: attr(title);
//   position: absolute;
//   z-index: 2;
//   color: white;
//   font-size: 12px;
//   background: #192733;
//   border-radius: 10px;
//   padding: 10px 15px 10px 15px;
//   max-width: 160px;
//   left: 0;
//   top: calc(100% + 5px);
//   animation: fadeIn .3s;
// }
// </style>