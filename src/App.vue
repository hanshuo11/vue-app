<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {};
    },
    beforeRouteUpdate(to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    }
  }
</script>

<style scoped>
  @import './assets/css/App.css';
  @import './assets/css/bootstrap.min.css';

  .slide-fade-enter {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: opacity 1s ease-in-out;
  }
</style>
