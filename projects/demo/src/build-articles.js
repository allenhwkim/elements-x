#!/usr/bin/env node
const med2md = require('medium-to-md');
const articles = [

];

var els = document.querySelectorAll('[href*="@allenhwkim"]');
var urls = [...new Set(Array.from(els))];
var urls2 = urls.map(el => el.href.replace(/\?.*$/,''));