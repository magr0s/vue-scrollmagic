<template>
  <div id="app" class="app">
    <h1 class="app-title">Vue Scrollmagic plugin!</h1>
    <div id="trigger"></div>
    <div class="info">
      <span class="info-item">Size: {{ info.size }}</span>
      <span class="info-item">Is vertical scrolling: {{ info.vertical }}</span>
      <span class="info-item">Current scroll position: {{ info.scrollPos }}</span>
      <span class="info-item">Last scroll direction: {{ info.scrollDirection }}</span>
      <span class="info-item">Container: {{ this.scrollContainer }}</span>
      <span class="info-item">Is element: {{ info.isDocument }}</span>
    </div>
    <div id="trigger2"></div>
    <div id="animate2">Animated</div>
    <div class="app-footer">
      <a href="#" @click.prevent="$scrollmagic.scrollTo(0)">Back to top</a>
    </div>
  </div>
</template>

<script>
import { TweenMax, Elastic } from 'gsap'
import 'ScrollToPlugin'

export default {
  data () {
    return {
      info: {
        size: this.$scrollmagic.info('size'),
        vertical: this.$scrollmagic.info('vertical'),
        scrollPos: this.$scrollmagic.info('scrollPos'),
        scrollDirection: this.$scrollmagic.info('scrollDirection'),
        container: this.$scrollmagic.info('container'),
        isDocument: this.$scrollmagic.info('isDocument')
      }
    }
  },

  computed: {
    scrollContainer () {
      return (this.info.container === window) ? 'window' : this.info.container.tagName
    }
  },

  created () {
    this.$scrollmagic.handleScrollTo = function (target) {
      TweenMax.to(window, 1.5, {
        scrollTo: {
          y: target,
          autoKill: false
        }
      })
    }

    window.addEventListener('scroll', this.handleScroll)
  },

  mounted () {
    const scene = this.$scrollmagic.scene({
      triggerElement: '#trigger',
      triggerHook: 0,
      duration: '50%',
      reverse: true
    })

    this.$scrollmagic.addScene(
      scene
        .setTween(
          TweenMax.from('.info', 20, {
            autoAlpha: 0,
            yPercent: 50,
            ease: Elastic.easeInOut
          })
        )
        .addIndicators()
    )

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
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    updateInfo () {
      this.info = this.$scrollmagic.info()
    },

    handleScroll (evt) {
      this.updateInfo()
    }
  }
}
</script>

<style lang="scss">
html {
  font-size: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
body {
  background-color: #121212;
  color: white;
}

.app {
  min-height: 250vh;

  &-title {
    margin-top: 60px;
    text-align:center;
  }

  #animate2 {
    border: 1px solid white;
    background-color: grey;
    padding: 10px;
  }

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5px 0;
    text-align: center;

    a{
      color: white;
      transition: color .2s ease-in-out;

      &:hover,
      &:active {
        color: rgba(white, .75);
      }
    }
  }
}

.info {
  position: fixed;
  top: 150px;
  left: 0;
  right: 0;
  width: 250px;
  margin: 0 auto;
  padding: 1rem 2rem;
  border-radius: 5px;
  background: rgba(#000, .5);
  text-align: center;
  transition: background .3s ease-in-out;

  &-item {
    display: block;
  }

  &.red-bg {
    background: rgba(red, .5);
  }
}

#trigger {
  height: 100vh;
}
</style>
