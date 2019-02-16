<template>
  <div>
    <div>
      <!-- <table
        class="table is-fullwidth is-scrollable"
        v-for="article in articles" :key="article.id">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody height="200px">
          <tr>
            <td>{{article.title.slice(0, 60)}}</td>
            <td>
              <button @click="setArticle(article)">Click to select</button>
            </td>
          </tr>
        </tbody>
      </table> -->
      <section>
        <div v-for="article in articles" :key="article.id">
          <a @click="setArticle(article)">{{article.title}}</a>
        </div>
      </section>

      <!-- <h1>{{article.title}}</h1> -->
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

<style lang="scss" scoped>

section {
  height: 100%;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
}
</style>
