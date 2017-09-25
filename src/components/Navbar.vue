<template lang="pug">

  b-navbar(toggleable='md', type='dark', variant='info')
    b-nav-toggle(target='nav_collapse')
    b-navbar-brand(href='#') Mikhail Semochkin
    b-collapse#nav_collapse(is-nav='')
      b-nav(is-nav-bar='')
        b-nav-item(href='#') Link
        b-nav-item(href='#') Link
        b-nav-item(href='#') Link
        b-nav-item(href='#') Link
      // Right aligned nav items
      b-nav.ml-auto(is-nav-bar='')
        // b-nav-item(href='#') Link

  
</template>


<script>
  
  export default {
    name: 'navbar',
    data () {
      return {}
    }
  }
  
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  h1, h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
  
</style>
