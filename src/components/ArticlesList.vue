<template>
  <div>
    <div v-for="article in articles" :key="article.id">
      <button @click="setArticle(article)">Click to select</button>
      <h1>{{article.title}}</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
  name: 'ArticlesList',
  computed: {
    ...mapGetters(['articles'])
  },
  methods: {
    setArticle(article) {
      this.$store.dispatch('setArticle', article)
    }
  }
}
</script>