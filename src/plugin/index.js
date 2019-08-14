import Scrollmagic from 'scrollmagic'
import 'debug.addIndicators'
import 'animation.gsap'

const VueScrollmagic = {
  install (Vue, options = {}) {
    const scrollmagic = {
      data () {
        return {
          controller_: new Scrollmagic.Controller({
            ...options,
            container: window
          }),
          handleScrollTo: null
        }
      },

      methods: {
        attachTo (els, options = {}) {
          if (els instanceof Element) {
            els.$scrollmagic = new Scrollmagic.Controller({
              ...options,
              container: els
            })
          } else if (!!els && els instanceof NodeList) {
            for (let i = 0; i < els.length; i++) {
              const el = els[i]

              el.$scrollmagic = new Scrollmagic.Controller({
                ...options,
                container: el
              })
            }
          } else {
            throw new Error('Error! You can only attach the controller to Element or NodeList.')
          }
        },

        addScene (newScene) {
          this.controller_.addScene(newScene)
        },

        destroy (resetScenes = false) {
          return this.controller_.destroy(resetScenes)
        },

        removeScene (scene) {
          this.controller_.removeScene(scene)
        },

        scrollTo (scrollTarget, additionalParameter) {
          this.controller_.scrollTo(scrollTarget, additionalParameter)
        },

        update (immediately = false) {
          this.controller_.update(immediately)
        },

        updateScene (scene) {
          this.controller_.updateScene(scene)
        },

        scrollPos (scrollPosMethod) {
          if (!arguments.length) return this.controller_.scrollPos()

          this.controller_.scrollPos(scrollPosMethod)
        },

        enabled (newState) {
          if (!arguments.length) return this.controller_.enabled()

          this.controller_.enabled(newState)
        },

        loglevel (newLoglevel) {
          if (!arguments.length) return this.controller_.loglevel()

          this.controller_.loglevel(newLoglevel)
        },

        info (about) {
          return (!arguments.length) ? this.controller_.info() : this.controller_.info(about)
        },

        scene (options) {
          return new Scrollmagic.Scene(options)
        }
      },

      watch: {
        handleScrollTo: function (handle) {
          this.controller_.scrollTo = handle
        }
      }
    }

    Vue.prototype.$scrollmagic = new Vue(scrollmagic)
  }
}

export default VueScrollmagic

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueScrollmagic)
}
