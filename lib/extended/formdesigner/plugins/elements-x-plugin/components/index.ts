import inputDate from './input-date';
import xCalendar from './x-calendar';
import xDropdown from './x-dropdown';

export default function(editor) {
  inputDate(editor);
  xDropdown(editor);
  xCalendar(editor);
}