
![image](https://user-images.githubusercontent.com/1437734/100136034-78959200-2e58-11eb-8125-260b78054a10.png)

[![Watch the video](https://i.imgur.com/fUSS9yc.png)](https://www.youtube.com/watch?v=5ejYrMoEbQo&ab_channel=AllenKim)

## Use with npm install
```
$ npm install elements-x --save
```
To use all custom elements
```
import { defineAll() } from "elements-x";
defineAll();
```
To use a single custom elements
```
import { XButton } from "elements-x";
XButton.define();
```

## Use with script tag
* Add script to head 
  ```
  <script src="//unpkg.com/elements-x/dist/elements-x.min.js"></script>
  ```

## Components
* [accordion](https://elements-x.com/component/accordion)
* [ace](https://elements-x.com/component/ace)
* [barcode](https://elements-x.com/component/barcode) 
* [button](https://elements-x.com/component/button) 
* [calendar](https://elements-x.com/component/calendar) 
* [carousel](https://elements-x.com/component/carousel) 
* [clipboard](https://elements-x.com/component/clipboard)
* [clock](https://elements-x.com/component/clock)
* [color-picker](https://elements-x.com/component/color-picker) 
* [dialog](https://elements-x.com/component/dialog) 
* [div](https://elements-x.com/component/div) 
* [flag](https://elements-x.com/component/flag) 
* [format](https://elements-x.com/component/format)
* [highlightjs](https://elements-x.com/component/highlightjs)
* [http](https://elements-x.com/component/http)
* [include](https://elements-x.com/component/include)
* input 
  * [text](https://elements-x.com/component/input/text)
  * [date](https://elements-x.com/component/input/date)
  * [time](https://elements-x.com/component/input/time)
  * [checkbox](https://elements-x.com/component/input/checkbox)
  * [radio](https://elements-x.com/component/input/radio)
  * [color](https://elements-x.com/component/input/color)
  * [file](https://elements-x.com/component/input/file)
  * [switch](https://elements-x.com/component/input/switch)
  * [mask](https://elements-x.com/component/input/mask)
* [mapbox](https://elements-x.com/component/mapbox)
* [openlayers](https://elements-x.com/component/openlayers)
* [overlay](https://elements-x.com/component/overlay)
* [pagination](https://elements-x.com/component/pagination)
* [qrcode](https://elements-x.com/component/qrcode)
* [route](https://elements-x.com/component/route)
* [select](https://elements-x.com/component/select)
* [sidebar](https://elements-x.com/component/sidebar)
* [snackbar](https://elements-x.com/component/snackbar)
* [table](https://elements-x.com/component/table)
* [tabs](https://elements-x.com/component/tabs)
* [tooltip](https://elements-x.com/component/tooltip)
* [translation](https://elements-x.com/component/translation)
* [typing-effect](https://elements-x.com/component/typing-effect)
* [ul](https://elements-x.com/component/ul)

## How Is It Different?
* It’s custom-elements, which works like html tags
* NOT dependent to any framework; Angular, React, nor, VueJS
* Customizable look-and-feel
