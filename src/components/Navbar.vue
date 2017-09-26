<template lang="pug">

  b-navbar(toggleable='md', type='dark', variant='info')
    b-nav-toggle(target='nav_collapse')
    b-navbar-brand(href='#') Mikhail Semochkin
    b-collapse#nav_collapse(is-nav='')
      b-nav(is-nav-bar='')
        b-nav-item(href='#') Обо мне
        b-nav-item(href='#') Опыт работы
        b-nav-item(href='#') Портфолио
        b-nav-item(href='#') Контакты
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
<style lang="scss" scoped>
  
  .navbar-brand {
    font-family: Lobster, Helvetica, Airal, sans-serif;
  }
  .nav {
    font-family: "Roboto Condensed", Helvetica, Airal, sans-serif;
  }

</style>
