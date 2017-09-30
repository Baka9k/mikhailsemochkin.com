<template lang="pug">
  
  b-container.cont
    b-row
      b-col(col, sm="6")
        h2
          strong
            span.fa.fa-sign-in
            |  Авторизация на mikhailsemochkin.com
        // LOGIN FORM
        b-form(action='/login', method='post')
          b-form-group
            label(for='login') Логин
            input#login.form-control(type='text', name='login')
          b-form-group
            label(for='password') Пароль
            input#password.form-control(type='password', name='password')
          b-button.btn.btn-success.btn-lg(type='submit') Войти
        
</template>


<script>
  
  export default {
    
    name: 'login',
    
    data () {
      return {}
    }
    
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
