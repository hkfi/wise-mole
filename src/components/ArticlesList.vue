<template>
  <div>
    <div>
      <table
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
      </table>

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

<style lang="sass">
.table
  &.is-scrollable
    tbody
      overflow-y: scroll
      width: auto
      position: absolute
</style>
