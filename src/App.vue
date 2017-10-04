<template lang="pug">
  
  div#app
    navbar(:isAdmin="isAdmin")
    router-view(:isAdmin="isAdmin")
  
</template>


<script>

  import Navbar from '@/components/Navbar'
  import $ from 'jquery'
  
  export default {
    
    name: 'app',

    components: {
      Navbar
    },
    
    methods: {
      checkAuthorization () {
        // Determines whether to show controls for admins.
        // Even if they will be shown to a non-admin user, he will not be able to do anything,
        // because all requests to API are checked for authorization of the user as an administrator.
        const that = this
        $.ajax({
          type: 'GET',
          url: '/api/amiadmin/',
          success: function (res) {
            // console.log(res);
            that.isAdmin = !!res.isAdmin
          },
          error: function (err) {
            console.log('Error in checkAuthorization(): ', err)
          }
        })
      }
    },

    created: function () {
      this.checkAuthorization()
    },

    data () {
      return {
        isAdmin: false
      }
    }
    
  }

</script>


<style lang="scss">
  
  #app {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f2f2;
    font-family: "Roboto Slab", Helvetica, Arial, sans-serif;
    color: #212529;
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
      @media (max-width: 768px) {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .max800-cont {
      max-width: 800px;
    }
    .centered {
      position: relative;
      float: none;
      margin-left: auto;
      margin-right: auto;
    }
    form {
    
    }
    .btn {
      border-radius: 2px;
      color: #fff;
      margin: 6px;
      cursor: pointer;
    }
  }
  
</style>
