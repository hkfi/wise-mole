<template>
  <div id="app">
    <div id="nav">
      <h1>News Reader</h1>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~bulma/css/bulma.css';
#nav {
  padding: 10px;
}
#nav h1 {
   color: gray;
   font-size: 1.5em;
}
</style>
