export class Translation {
  static translate(key, map={}) {
    let value, keys;
    if (key.match(/\.[a-z0-9_]+$/i)) {
      keys = key.split('.'); // e.g. foo, foo.bar.baz
      value = Translation[Translation.language]?.[keys[0]]; // first key

      for (var i = 1; i < keys.length; i++) {
        value = value?.[keys[i]];
        if (!value && Translation.language !== 'en') {
          value = 'translation not found for ' + key;
          return value;
        }
      }
    } else {
      value = Translation[Translation.language]?.[key]?.trim();
    }

    if (!value && Translation.language !== 'en') {
      console.warn(`no translation of "${key}"`)
    }

    if (value) {
      for(var k in map) {
        value = value.replace(new RegExp(`$\{${k}}`, 'g'), map[k]); 
        value = value.replace(new RegExp(`{{${k}}}`, 'g'), map[k]); 
      }
      return value;
    }
  }

  static getLanguage() {
    const language = window.localStorage.getItem('language') ||
      Translation.getCookie('language') ||
      document.documentElement.getAttribute('lang')  || // html tag
      navigator.language.split('-')[0] || 'en';
    return language.toLowerCase();
  }

  static getCookie(name) {
    const found = document.cookie.split('; ')
      .find(el => el.startsWith(`${name}=`));
    return found ? found.split('=')[1] : null; 
  }
  
}
Translation.en = undefined;
Translation.language = Translation.getLanguage();