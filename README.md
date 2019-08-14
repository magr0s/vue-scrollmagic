# Vue Scrollmagic ![Current version](https://img.shields.io/badge/dynamic/json.svg?label=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmagr0s%2Fvue-scrollmagic%2Fmaster%2Fpackage.json&query=version&colorB=orange&style=flat-square)

[![Build Status](https://travis-ci.org/magr0s/vue-scrollmagic.svg?branch=master)](https://travis-ci.org/magr0s/vue-scrollmagic)
![Vue.js version](https://img.shields.io/badge/dynamic/json.svg?label=vue.js&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmagr0s%2Fvue-scrollmagic%2Fmaster%2Fpackage.json&query=dependencies.vue&colorB=blue&style=flat-square)
![Vue.js version](https://img.shields.io/badge/dynamic/json.svg?label=ScrollMagic&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmagr0s%2Fvue-scrollmagic%2Fmaster%2Fpackage.json&query=dependencies.scrollmagic&colorB=blue&style=flat-square)
![License](https://img.shields.io/badge/license-MIT-lightgrey.svg?&style=flat-square)
[![BuyMeACoffee](https://camo.githubusercontent.com/cd005dca0ef55d7725912ec03a936d3a7c8de5b5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6275792532306d6525323061253230636f666665652d646f6e6174652d79656c6c6f772e737667)](https://www.buymeacoffee.com/PpQJNnmDa)

[ScrollMagic](http://scrollmagic.io/) plugin for Vue.js

* [Install](#Install)
* [Usage](#Usage)
* [Documentation](#Documentation)
* [Example](#Example)
* [Development](#Development)
* [Autor](#Autor)
* [License](#License)


## Install

#### NPM
```
npm i vue-scrollmagic --save
```

## Usage

#### mount with global
```js
import VueScrollmagic from 'vue-scrollmagic'
Vue.use(VueScrollmagic)
```
#### mount with nuxt.js/ssr
```js
// plugins/vue-scrollmagic.js
import VueScrollmagic from 'vue-scrollmagic'
Vue.use(VueScrollmagic)

// nuxt.config.js
{
  ...
  plugins: [{
    src: '~plugins/vue-scrollmagic.js',
    ssr: false
  }]
  ...
}
```
Once installed, the plugin add $scrollmagic to Vue.prototype and create global controller, to make him easily accessibles in every components.

## Documentation

See [ScrollMagic API](http://scrollmagic.io/docs/index.html) and [Example](https://github.com/magr0s/vue-scrollmagic/blob/master/src/App.vue)

#### Configure controller
```js
Vue.use(VueScrollmagic, {
  verical: true,
  globalSceneOptions: {},
  loglevel: 2,
  refreshInterval: 100
})
```
__NOTE__: Container is always a window.

#### Set custom scollTo handle
```js
// src/main.js
...
this.$scrollmagic.handleScrollTo = function (target) {
  // some code
}
...
```

#### Set custom scrollTo handle with GSAP animation
```js
import { TweenMax } from 'gsap'
import 'ScrollToPlugin'
...
this.$scrollmagic.handleScrollTo = function (target) {
  TweenMax.to(window, 1.5, {
    scrollTo: {
      y: target,
      autoKill: false
    }
  })
}
...
```

#### Methods

|Name | Description|
|- | - |
|attachTo | Create scrollmagic controller to custom element. After creating the controller, you have access to your own Scrollmagic.Controller methods. |
|scene | A Scene defines where the controller should react and how.|
|addScene | Add one ore more scene(s) to the controller.|
|destroy | Destroy the controller, all scenes and everything.|
|removeScene | Remove one ore more scene(s) from the controller.|
|scrollTo | Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for |scrolling.|
|update | Updates the controller params and calls updateScene on every scene, that is attached to the controller.|
|updateScene | Update one ore more scene(s) according to the scroll position of the container.|
|enabled | Get or Set the current enabled state of the controller.|
|loglevel | Get or Set the current loglevel option value.|
|scrollPos | Get the current scrollPosition or Set a new method to calculate it. When used as a setter this method prodes a |way to permanently overwrite the controller's scroll position calculation.|
|info | Get all infos or one in particular |

__NOTE__: In package adds plugins 'gsap.animation' and 'debug.addIndicators'

## Example

```js
mounted() {
  // Declare Scene
  const scene2 = this.$scrollmagic.scene({
    // ID of element where animation starts
    triggerElement: '#trigger2',

    // {0,0.5,1} - animations starts from {top,center,end} of window
    triggerHook: 0.5,

    // Duration of animation
    duration: 300
  })
    // Declaration of animation and attaching to element
    .setTween('#animate2', { 
      css: { 
        borderTop: '30px solid white', 
        backgroundColor: 'blue',
        scale: 0.7 // the tween durtion can be omitted and defaults to 1
      }
    })
    // Helpful tags for orientation on the screen
    .addIndicators({ name: '2 (duration: 300)' })

  // Add Scene to controller
  this.$scrollmagic.addScene(scene2)

  const scene3 = this.$scrollmagic.scene({
    triggerElement: '#box-inner', // set trigger on inner element
    triggerHook: 0,
    duration: '100%'
  })
    .setTween(
      // Declaration of animation and attaching to element
    )
    .addIndicators()

  // Attaching scrollmagic controller to element
  this.$scrollmagic.attachTo(this.$refs.scrollBox)

  // Add scene to element scrollmagic controller
  this.$refs.scrollBox.$scrollmagic.addScene(scene3)
}
```

## Development

#### Compiles and hot-reloads
```
npm run serve
```
#### Compiles and minifies demo
```
npm run build:demo
```
#### Compiles and minifies library
```
npm run build:lib
```
#### Lints and fixes files
```
npm run lint
```
## Author

[magr0s](https://github.com/magr0s)

## License

[MIT](https://github.com/magr0s/vue-scrollmagic/blob/master/LICENSE)