<template lang="pug">

  b-navbar(toggleable='md', type='dark', variant='info')
    b-nav-toggle.nav-toggle(target='nav_collapse')
    b-navbar-brand(href='#') Mikhail Semochkin
    b-collapse#nav_collapse(is-nav)
      b-nav(is-nav-bar='')
        b-nav-item(to='about') Обо мне
        b-nav-item(to='experience') Опыт работы
        b-nav-item(to='portfolio') Портфолио
        b-nav-item(to='contact') Контакты
      // Right aligned nav items
      b-nav.ml-auto(is-nav-bar='')
        div(v-if="isAdmin")
          b-nav-item(href='/logout') Разлогиниться

</template>


<script>
  
  export default {
    
    name: 'navbar',

    props: {
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    
    data () {
      return {}
    }
    
  }
  
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  .navbar {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    font-size: 16px;
    min-height: 64px;
  }
  .navbar-brand {
    font-family: Lobster, Helvetica, Airal, sans-serif;
    font-size: 28px;
  }
  .nav {
    font-family: "Roboto Condensed", Helvetica, Airal, sans-serif;
    font-size: 18px;
    font-weight: 500;
  }
  .navbar-expand-md .navbar-nav .nav-link {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  @media (max-width: 869px) {
    .navbar-brand {
      font-size: 21px;
    }
    .navbar-expand-md .navbar-nav .nav-link {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
  }
  @media (max-width: 767px) {
    .navbar {
      min-height: initial;
    }
    #nav_collapse {
      border-top: solid 1px rgba(255, 255, 255, 0.1);
      margin-top: 8px;
      padding-top: 8px;
    }
  }
  .nav-toggle {
    outline: #fff;
  }

</style>
