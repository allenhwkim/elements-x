export default /* css */ `
  file-select {
    display: inline-block;
    background: #F5F5F5;
    padding: 16px;
    border: 1px solid #F5F5F5;
    box-sizing: border-box;
  }

  file-select .x-file-input {
    cursor: pointer;
  }

  file-select .x-file-input input {
    display: none;
  }

  file-select .x-file-list {
    color: #666;
  }

  file-select .x-file-list .x-file { /* file info */
    display: flex;
    padding: 4px;
    position: relative;
    justify-content: space-between;
  }

  file-select .x-file-list .x-file:first-child {
    border-top: 1px solid #ccc;
  }

  file-select .x-file-list .x-file:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  file-select .x-file-list .x-file .x-name {
    white-space: nowrap;
  }

  file-select .x-file-list .x-file .x-preview {
    max-width: 200px;
    max-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  file-select .x-file-list .x-file .x-buttons * {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;