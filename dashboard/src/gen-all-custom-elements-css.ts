import comboboxCss from '../../elements/src/combobox/combobox.css';
import fileSelectCss from '../../elements/src/file-select/file-select.css';
import formStepperCss from '../../elements/src/form-stepper/form-stepper.css';
import inputMaskCss from '../../elements/src./input-mask/input-mask.css';
import listSelectCss from '../../elements/src/list-select/list-select.css';
import sidebarCss from '../../elements/src/sidebar/sidebar.css'; // side-bar
import paginationCss from '../../elements/src/x-pagination/pagination.css'; // x-pagination/

[
  ['combo-box', comboboxCss],
  ['file-select', fileSelectCss],
  ['form-stepper', formStepperCss],
  ['input-mask', inputMaskCss],
  ['list-select', listSelectCss],
  ['side-bar', sidebarCss],
  ['x-pagination', paginationCss],
].forEach( ([tagName, css]) => {
  tagName = tagName.toLowerCase();
  console.info(css);
});