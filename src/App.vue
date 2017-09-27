<template lang="pug">
  
  div#app
    navbar
    router-view
  
</template>


<script>

  import Navbar from '@/components/Navbar'
  
  export default {
    
    name: 'app',

    components: {
      Navbar
    }
    
  }

</script>


<style lang="scss">
  
  #app {
    font-family: "Roboto Slab", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    line-height: 20px;
    h1, h2, h3 {
      font-family: "Roboto Condensed", Helvetica, Arial, sans-serif;
    }
    .cont {
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }
  
</style>
