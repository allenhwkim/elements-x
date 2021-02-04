export function localDate(date) {
  if (!date) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  }
  const str = date.replace(/[^0-9]/g, '');
  const [year, month, day] = 
    [str.substr(0,4), str.substr(4,2), str.substr(6,2)];
  const [hour, min, sec] = 
    [str.substr(8,2), str.substr(10,2), str.substr(12,2)];
  return new Date(+year, +month - 1, +day, +hour, +min, +sec);
}
