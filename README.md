# Vue Scrollmagic ![Current version](https://img.shields.io/badge/dynamic/json.svg?label=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmagr0s%2Fvue-scrollmagic%2Fmaster%2Fpackage.json&query=version&colorB=orange&style=flat-square)

[![Build Status](https://travis-ci.org/magr0s/vue-scrollmagic.svg?branch=master)](https://travis-ci.org/magr0s/vue-scrollmagic)
![Vue.js version](https://img.shields.io/badge/dynamic/json.svg?label=vue.js&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmagr0s%2Fvue-scrollmagic%2Fmaster%2Fpackage.json&query=dependencies.vue&colorB=blue&style=flat-square)
![Vue.js version](https://img.shields.io/badge/dynamic/json.svg?label=ScrollMagic&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmagr0s%2Fvue-scrollmagic%2Fmaster%2Fpackage.json&query=dependencies.scrollmagic&colorB=blue&style=flat-square)
![License](https://img.shields.io/badge/license-MIT-lightgrey.svg?&style=flat-square)


[ScrollMagic](http://scrollmagic.io/) plugin for Vue.js

* [Install](#Install)
* [Usage](#Usage)
* [Documentation](#Documentation)
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
import Scrollmagic from 'scrollmagic'
Vue.use(Scrollmagic)
```
#### mount with nuxt.js/ssr
```js
// plugins/vue-scrollmagic.js
import Scrollmagic from 'scrollmagic'
Vue.use(Scrollmagic)

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

#### Methods

|Name | Description|
|- | - |
|scene | A Scene defines where the controller should react and how.|
|addScene | Add one ore more scene(s) to the controller.|
|destroy | Destroy the controller, all scenes and everything.|
|removeScenes | Remove one ore more scene(s) from the controller.|
|scrollTo | Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for |scrolling.|
|update | Updates the controller params and calls updateScene on every scene, that is attached to the controller.|
|updateScene | Update one ore more scene(s) according to the scroll position of the container.|
|enabled | Get or Set the current enabled state of the controller.|
|loglevel | Get or Set the current loglevel option value.|
|scrollPos | Get the current scrollPosition or Set a new method to calculate it. When used as a setter this method prodes a |way to permanently overwrite the controller's scroll position calculation.|
|info | Get all infos or one in particular |

If you want to use plugins configure webpack settings.
```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.resolve.alias
        .set('ScrollMagic', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js')
        .set('debug.addIndicators', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
  }
}

// webpack.config.js
// maybe need use `npm i -SD path` 
...
resolve: {
    alias: {
      ...
      ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    },
  },
...

// src/main.js
...
import 'debug.addIndicators'
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