import { BlockProperties } from 'grapesjs';
import inputAddress from './input-address';
import inputCountry from './input-country';
import inputDate from './input-date';
import inputPhone from './input-phone';
import inputPostalCode from './input-postal-code';
import inputProvince from './input-province';
import inputState from './input-state';
import inputZipCode from './input-zip-code';
import inputText from './input-text';

export default function(editor, props: BlockProperties) {
  inputText(editor, props);
  inputDate(editor, props);
  inputProvince(editor, props);
  inputCountry(editor, props);
  inputState(editor, props);
  inputAddress(editor, props);
  inputPhone(editor, props);
  inputZipCode(editor, props);
  inputPostalCode(editor, props);
}