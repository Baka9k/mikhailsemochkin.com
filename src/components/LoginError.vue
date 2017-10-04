<template lang="pug">
  
  b-container.cont
    b-row
      b-col(col, sm="6", offset-sm="3")
        h2
          strong
            span.fa.fa-sign-in
            |  Ошибка авторизации
        p
          | Вы ввели неправильный логин или пароль
        p
          b-button.btn.btn-warning.btn-lg(to='login') Ещё раз
          b-button.btn.btn-success.btn-lg(to='/') На сайт
        
</template>


<script>
  
  export default {
    
    name: 'loginError',
    
    data () {
      return {}
    }
    
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  


</style>
