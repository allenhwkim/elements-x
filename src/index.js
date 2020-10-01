// <body>...<script type="text/javascript" src="main.[hash].js"></script></body>
import '../src/style.css';
import '../src/app.scss';

// import webpackgif from './assets/images/webpack.gif';
// setting the source of img document.getElementById('webpack-gif').setAttribute('src', webpackgif);

import '../lib';
import './app-custom-css';
import './app-pre';
import './app-group-header';
import './app-articles';
import './tools/app-unicodes';

// enable/disable outline for click and tab
document.body.addEventListener('click', 
  e => document.body.classList.remove('a11y-outline') );
document.body.addEventListener('keydown', 
  e => (e.key === 'Tab') && document.body.classList.add('a11y-outline') );