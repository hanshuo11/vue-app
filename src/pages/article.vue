<template>
  <div>
    <header class="article_header">
      <img src="static/images/back.png" class="back" @click="goback">
    </header>

    <div id="new_content" v-html="new_cotent">
    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {}
    },
    computed: {
      new_cotent: function () {
        return this.$store.state.article;
      }
    },
    methods: {
      goback: function () {
        this.$router.goBack()
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/article_css.css';
</style>
