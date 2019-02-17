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
      @mousedown="recordCommand();addMicrophone();"
      @touchstart="recordCommand();addMicrophone();"
      @mouseup="stopRecording();addNewspaper();"
      @touchend="stopRecording();addNewspaper();"
      style="display:flex;flex-direction:column;justify-content:center;align-items:center">
      <i class="far fa-newspaper"></i>
      <i class="far fa-hand-point-up"></i>
      <div class="pulse-ring">
      </div>
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
      givenInstructions: false,
      start: false
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
          window.speechSynthesis.cancel();
          this.nextNews();
          break
        case "back":
          window.speechSynthesis.cancel();
          this.prevNews();
          break
        case "play":
          if (this.start === false) {
            this.nextNews();
            this.start = true;
          }
          this.betterReadText(this.article.content)
          break
        case "stop":
          window.speechSynthesis.cancel();
          break
        case "pause":
          window.speechSynthesis.pause();
          break
        case "resume":
          window.speechSynthesis.resume();
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
    addMicrophone() {
      const btn = document.querySelector('.round-button')
      btn.innerHTML = "<i class='fas fa-microphone'></i>"
    },
    addNewspaper() {
      const btn = document.querySelector('.round-button')
      btn.innerHTML =  "<i class='far fa-newspaper'></i><i class='far fa-hand-point-up'></i>"
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
    background-color: #E5D9F2;
    border: none;
    box-shadow: 1px 1px 20px -5px #999;
    font-size: 100px;
    outline: none;
    color: #30142A;
    &:active {
      box-shadow: none;
      background-color: #c7bad6;
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .fa-hand-point-up {
    -webkit-animation: action 1s infinite  alternate;
        animation: action 1s infinite  alternate;
    }
    @-webkit-keyframes action {
        0% { transform: translateY(0); }
        100% { transform: translateY(-5px); }
    }
    @keyframes action {
        0% { transform: translateY(0); }
        100% { transform: translateY(-5px); }
    }
  .fa-microphone {
    animation: pulsate infinite 3s;

    @-webkit-keyframes pulsate {
      0% {
        -webkit-transform: scale(1, 1);
        opacity: 1;
      }
      50% {
        -webkit-transform: scale(1.1, 1.1);
        opacity: 0.3;
      }
      100% {
        -webkit-transform: scale(1, 1);
        opacity: 1;
      }
    }
  }


</style>