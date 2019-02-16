<template>
  <div class="home">
    <button @click="sayHello" >
      hello vue.js!
    </button>
    <button @click="classifyText" >
      classify text
    </button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function() {
    return {
      api: "https://twinword-text-classification.p.rapidapi.com/classify/",
      text: "A probe touched melted nuclear fuel debris in a destroyed reactor at the Fukushima No. 1 nuclear plant, a long-awaited milestone in the battle toward decommissioning, Tokyo Electric Power Co. said Feb. 13.The rod-like probe, fitted with 3-centimeter-long claws, lifted pieces of the nuclear fuel debris during the eight-hour operation at the bottom of the No. 2 reactor at the plant, the utility said."
    }
  },
  methods: {
    sayHello() {
      console.log("hello vue.js")
    },

    classifyText() {
      // const axios = require('axios');
      const unirest = require('unirest');

      console.log(this.api)
      unirest.post("https://twinword-text-classification.p.rapidapi.com/classify/")
      .header("X-RapidAPI-Key", "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
      .header("Content-Type", "application/x-www-form-urlencoded")
      .send({text: this.text})
      .end(function (result) {
        console.log(result.status, result.headers, result.body);
        // console.log(result.body.categories);
      });

      // axios({
      //   method:'post',
      //   url: this.api,
      //   responseType:'json',
      //   headers: {
      //     // 'RapidAPI Project': 'default-application_5bdc1d68e4b02e44153fdfd6',
      //     'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   data: {text: 'hello world'}
      // })
      // .then((response) => {
      //   console.log(response.data)
      // })
    }
  }
}
</script>
