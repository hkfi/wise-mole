<template>
  <div class="home">
    <button @click="readText('hello')" >
      listen now
    </button>
  </div>
</template>

<script>
import {VoiceRSS} from "./voicerss-tts.min.js"

export default {
  name: 'home',
  // data: function() {
  //   return {
  //     api: "https://twinword-text-classification.p.rapidapi.com/classify/",
  //     text: "Losses were down 15 percent for the full year over 2017, but still reached an adjusted $1.8 billion. That could pose a challenge to investors trying to figure out Uber's value in the public markets. Last year, bankers vying to lead the company's initial public offering told Uber the market could value it at $120 billion. News that the company is still burning through more than $1 billion annually may give some investors pause."
  //   }
  // },
  //  mounted() {
  //     let scriptEl = document.createElement('script');
  //     scriptEl.setAttribute('src', 'voicerss-tts.min.js');
  //     document.head.appendChild(scriptEl);  
  // },
  methods: {

    readText(text) {
      // const axios = require('axios');
      //const unirest = require('unirest');

      // console.log(this.api)
      // unirest.post("https://twinword-text-classification.p.rapidapi.com/classify/")
      // .header("X-RapidAPI-Key", "TEXT-TO-SPEECH-APIKEY")
      // .header("Content-Type", "application/x-www-form-urlencoded")
      // .send({text: this.text})
      // .end(function (result) {
      //   console.log(result.status, result.headers, result.body);
      // });

      //let audio;

//       unirest.post("https://voicerss-text-to-speech.p.rapidapi.com/?key=TEXT-TO-SPEECH-APIKEY")
//       .header("X-RapidAPI-Key", "d51e27ba10mshc6be04667d95ad9p121266jsn0bcfa2a211c0")
//       .header("Content-Type", "application/x-www-form-urlencoded")
//       .send("c=mp3")
//       .send("r=0")
//       .send("f=8khz_8bit_mono")
//       .send("src=Hello, world!")
//       .send("hl=en-us")
//       .end(function (result) {
//         console.log(result.headers, result.body);
//         audio = new Audio(result.body);
//         console.log(audio);
//         // const playPromise = audio.play();
//         // if (playPromise !== null){
//         //     playPromise.catch(() => { audio.play(); })
//         // }
//         //audio.play();
//       });


      VoiceRSS.speech({
            key: 'TEXT-TO-SPEECH-APIKEY',
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
