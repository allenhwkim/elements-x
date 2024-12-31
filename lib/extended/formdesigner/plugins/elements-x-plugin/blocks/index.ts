import inputAddress from './input-address';
import inputCountry from './input-country';
import inputDate from './input-date';
import inputPhone from './input-phone';
import inputPostalCode from './input-postal-code';
import inputProvince from './input-province';
import inputState from './input-state';
import inputZipCode from './input-zip-code';

export default function(editor) {
  inputDate(editor);
  inputProvince(editor);
  inputCountry(editor);
  inputState(editor);
  inputAddress(editor);
  inputPhone(editor);
  inputZipCode(editor);
  inputPostalCode(editor);
}