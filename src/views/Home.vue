<template>
  <div class="home">
    <button @click="readText('hello')" >
      listen now
    </button>
    <ArticleCard/>
    <ArticlesList/>
  </div>
</template>

<script>
import {VoiceRSS} from "./voicerss-tts.min.js"

import ArticlesList from '../components/ArticlesList.vue'
import ArticleCard from '../components/ArticleCard.vue'

export default {
  name: 'home',
  components: {
    ArticlesList,
    ArticleCard
  },
  mounted() {
    console.log('mounted, querying db for news');
    this.getNews();
  },
  methods: {
    readText(text) {
      VoiceRSS.speech({
        key: '7f63364aebe443a9abc5a8a6b6e3ef5b',
        src: text,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
      });
    },
    async getNews() {
      console.log('getting news')
      await this.$store.dispatch('getArticles')
      console.log(this.$store.state.articles)
    }
  }
}
</script>
