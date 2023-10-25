export default /*css*/ `
  x-pagination {
    display: block;
  }
  x-pagination .navigation .prev {
    display: inline-block;
  }

  x-pagination .page {
    border: none;
    background: #FFF;
    min-width: 28px;
    min-height: 28px;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    color: inherit;
  }

  x-pagination .page:disabled { color: #CCC; }
  x-pagination .page.prev::before { content : '◀'; }
  x-pagination .page.next::before { content : '▶'; }
  x-pagination .page.first::before { content : '◀◀'; }
  x-pagination .page.last::before { content : '▶▶'; }

  x-pagination .pages {
    display: inline-block;
  }

  x-pagination .pages > .page.selected {
    color: #FFF;
    background-color: #0B51C1;
    border-radius: 4px;
    box-shadow: 0 2px 5px 0 #DDD, 0 2px 10px 0 #CCC;
    transition: all .2s linear;
  }`;