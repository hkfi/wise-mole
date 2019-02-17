<template>
  <div class="home">
    <!-- <div class="columns"> -->
      <!-- <div class="column"> -->
        <!-- <button
          v-show="index > 0"
          @click="prevNews"
          class="is-large">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
        </button> -->
      <!-- </div> -->
      <!-- <div class="column"> -->
        <!-- <button
          v-show="$store.state.article.content"
          @click="readText(article.content)" >
          Play
        </button> -->
      <!-- </div>
      <div class="column"> -->
        <!-- <button
          @click="nextNews"
          class="is-large">
          <span class="icon">
            <i class="fas fa-arrow-right"></i>
          </span>
        </button> -->
      <!-- </div> -->
    <!-- </div> -->
    <button class="round-button"
      @mousedown="recordCommand();changeBtnText();"
      @mouseup="stopRecording();changeBtnText();">
      Hold
    </button>
    <!-- <ArticleCard class="column" /> -->
  </div>
</template>

<script>
import { VoiceRSS } from "../util/voicerss-tts.min.js"
import { mapGetters } from 'vuex'

import ArticleCard from '../components/ArticleCard.vue'

import axios from 'axios'

export default {
  name: 'home',
  components: {
    ArticleCard
  },
  data() {
    return {
      recognition: "",
      word: "asdf",
      speech: "",
      givenInstructions: false
    }
  },
  mounted() {
    console.log('mounted, querying db for news');
    window.addEventListener('keydown', e => {
      if (e.keyCode === 37) {
        this.prevNews();
      } else if (e.keyCode === 39) {
        this.nextNews();
      } else if (e.keyCode === 32) {
        this.betterReadText(this.article.content);
      }
    })
    this.getNews();
  },
  watch: {
    article: function() {
      if (this.articles.length - this.index < 10) {
        this.getNews();
      }
      this.betterReadText(this.$store.state.article.title)
    },
    word: function(newVal, oldVal) {
      newVal.toLowerCase();
      switch(newVal) {
        case "":
          break;
        case "next":
          this.nextNews();
          break
        case "back":
          this.prevNews();
          break
        case "play":
          this.betterReadText(this.article.content)
          break
        case "stop":
          window.speechSynthesis.cancel();
          break
        default:
          if (this.givenInstructions) {
            this.betterReadText('Sorry, try again.')
          } else {
            this.betterReadText('Sorry, I missed that. Available commands: next, play, pause, stop, continue, and back.')
            this.givenInstructions = true
          }
          break
      }
    }
  },
  computed: {
    ...mapGetters(['article', 'articles']),
    index: function() {
      return this.articles.findIndex(article => article.title === this.article.title)
    }
  },
  methods: {
    readText(text) {
      console.log(text)
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
    betterReadText(text) {
      this.speech = new SpeechSynthesisUtterance(text);
      this.speech.lang = 'en-US';
      window.speechSynthesis.speak(this.speech);
    },
    recordCommand() {
      window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      this.recognition = new window.SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.onresult = (event) => {
        console.log('transscript: ', event.results[event.results.length -1][0].transcript);
        this.word = event.results[event.results.length -1][0].transcript;
      }
      this.recognition.start()
    },
    changeBtnText() {
      const btn = document.querySelector('.round-button')
      if (btn.innerText === "Hold") {
        btn.innerText = "Speak"
      } else {
        btn.innerText = "Hold"
      }
    },
    stopRecording() {
      this.recognition.stop()
      this.word = ""
    },
    async getNews() {
      console.log('getting news')
      await this.$store.dispatch('getArticles')
      console.log(this.$store.state.articles)
    },
    prevNews() {
      if (this.index !== 0) {
        const prevArticle = this.articles[this.index - 1]
        this.$store.dispatch('setArticle', prevArticle)
      }
    },
    nextNews() {
      this.$store.dispatch('setArticle', this.articles[this.index + 1])
      console.log(this.article)
    }
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .round-button {
    height: 100vh;
    width: 100vw;
    // border-radius: 50%;
    background-color: #fbc333;
    border: none;
    box-shadow: 1px 1px 20px -5px #999;
    font-size: 100px;
    outline: none;
    // margin: 20px 50px 50px 50px;
    &:active {
      box-shadow: none;
      background-color: #e4b132;
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
  }
</style>