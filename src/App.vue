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
    <div class="app-footer">
      <a href="#" @click.prevent="$scrollmagic.scrollTo(0)">Back to top</a>
    </div>
  </div>
</template>

<script>
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

  methods: {
    updateInfo () {
      this.info = this.$scrollmagic.info()
    },

    handleScroll (evt) {
      this.updateInfo()
    }
  },

  created () {
    window.addEventListener('scroll', this.handleScroll)
  },

  mounted () {
    const scene = this.$scrollmagic.scene({
      triggerElement: '#trigger',
      triggerHook: 0,
      duration: '50%'
    })

    this.$scrollmagic.addScene(
      scene
        .on('enter', function () {
          document.querySelector('.info').classList.add('red-bg')
        })
        .on('leave', function () {
          document.querySelector('.info').classList.remove('red-bg')
        })
    )
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
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
