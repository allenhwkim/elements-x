export class Translation {

  static translate(key, map={}) {
    let value, keys;
    if (key.match(/\.[a-z0-9_]+$/i)) {
      keys = key.split('.'); // e.g. foo, foo.bar.baz
      value = Translation[Translation.getLanguage()]?.[keys[0]]; // first key

      for (var i = 1; i < keys.length; i++) {
        value = value?.[keys[i]];
        if (!value && Translation.getLanguage() !== 'en') {
          value = `(${Translation.getLanguage().toUpperCase()}) ${key}`;
          return value;
        }
      }
    } else {
      value = Translation[Translation.getLanguage()]?.[key]?.trim();
    }

    if (!value) {
      value = Translation.getLanguage() === 'en' ?
        key : `(${Translation.getLanguage().toUpperCase()}) ${key}`;
    }

    if (value) {
      for(let key in map) {
        value = value.replace(new RegExp(`$\{${key}}`, 'g'), map[key]); 
        value = value.replace(new RegExp(`{{${key}}}`, 'g'), map[key]); 
      }
      return value;
    }
  }

  static getLanguage() {
    function cookieLang() {
      const found =  document.cookie.split('; ')
        .find(el => el.startsWith(`${name}=`));
      return found ? found.split('=')[1] : null; 
    }
  
    const language = 
      Translation.language ||
      window.localStorage.getItem('language') ||
      cookieLang() ||
      document.documentElement.getAttribute('lang')  || // html tag
      navigator.language.split('-')[0] || 
      'en';
    return language.toLowerCase();
  }

}