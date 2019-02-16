<template>
  <div>
    <h1>{{article.title}}</h1>
    <h2>{{article.content}}</h2>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: ['article']
}
</script>
