<template>
  <div>
    <h1>{{article.title}}</h1>
    <h2>{{article.content}}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ArticleCard',
  computed: {
    ...mapGetters(['article'])
  }
}
</script>
