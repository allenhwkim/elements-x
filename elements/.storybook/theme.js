import { create } from '@storybook/theming';

const lightBg = '#EDEDED';
const lightBgText = '#202020';
const lightBgText2 = '#3F3F3F';
const lightBgLightText = '#707070';
const darkBg = '#202020';
const darkBgText = '#FFFFFF';
const darkBgLightText = '#707070';
const accentBg = '#FFDF6C';
const accentText = '#202020';
const accentLightText = '#707070';

export default create({
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  base: lightBg,
  colorPrimary: lightBgText, 
  colorSecondary: lightBgText2,

  // UI
  appBg: lightBg,
  appContentBg: '#FFFFFF',
  appBorderColor: lightBgLightText,
  appBorderRadius: 4,
  layoutMargin: 10,

  // Text colors
  textColor: lightBgText,
  textInverseColor: darkBgLightText,

  // Toolbar default and active colors
  barBg: darkBg, 
  barTextColor: '#CCCCCC',
  barSelectedColor: darkBgText,

  // Form colors
  inputBg: lightBg,
  inputBorder: '#CCCCCC',
  inputTextColor: lightBgText,
  inputBorderRadius: 4,
  buttonBg: '#CCCCCC',
  buttonBorder: 4,
  booleanBg: lightBgText2,
  booleanSelectedBg: '#FFFFFF',

  // Brand
  brandTitle: 'Formflow custom elements',
  brandUrl: '/',
  brandTarget: '_self',
});