<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="getDifficulty">
      get text difficulty
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data() {
    return {
      api: "https://twinword-language-scoring.p.rapidapi.com/text/",
      text: "Losses were down 15 percent for the full year over 2017, but still reached an adjusted $1.8 billion. That could pose a challenge to investors trying to figure out Uber's value in the public markets. Last year, bankers vying to lead the company's initial public offering told Uber the market could value it at $120 billion. News that the company is still burning through more than $1 billion annually may give some investors pause."
    }
  },
  methods: {
    getDifficulty() {
      const unirest = require('unirest');
      unirest.post(this.api)
             .header("X-RapidAPI-Key", "d1a329222bmsh48b7736d3c61852p1b73b0jsn1c0077714657")
             .send({text: this.text})
             .end(function (result) {
               console.log(`the difficulty level is: ${result.body.ten_degree}`)
             })
    }
  }
}
</script>