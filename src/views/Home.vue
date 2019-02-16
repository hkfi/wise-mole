<template>
  <div class="home">
    <button @click="readText('hello')" >
      listen now
    </button>
    <List/>
  </div>
</template>

<script>
import {VoiceRSS} from "./voicerss-tts.min.js"

import List from '../components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    List
  },
  mounted() {
    console.log('mounted, querying db for news')
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
    }
  }
}
</script>
