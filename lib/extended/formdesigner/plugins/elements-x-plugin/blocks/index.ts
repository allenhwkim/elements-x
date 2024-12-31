import inputCountry from './input-country';
import inputDate from './input-date';
import inputProvince from './input-province';
import inputState from './input-state';

export default function(editor) {
  inputDate(editor);
  inputProvince(editor);
  inputCountry(editor);
  inputState(editor);
}