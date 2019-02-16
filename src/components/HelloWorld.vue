<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getNews">
      Click to get news
    </button>
    <div v-for="article in articles" :key="article.id">
      <h1>{{article.title}}</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(['articles'])
  },
  methods: {
    async getNews() {
      console.log('getting news')
      // const params = {
      //   autoCorrect: true,
      //   pageNumber: 1,
      //   pageSize: 10,
      //   q: 'Money',
      //   safeSearch: false
      // }
      // const headers = {
      //   'X-RapidAPI-Key': '16832c2387msh6ee4acc5b12e872p1fa543jsn1c9ee32b0012'
      // }
      // const result = await axios.get(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI`, {
      //   params,
      //   headers
      // })
      // console.log(result)
      await this.$store.dispatch('getArticles')
      console.log(this.articles)
    }
  }
}
</script>