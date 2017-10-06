<template lang="pug">
  
  div
    b-container.cont
    
      .add-item(v-if="isAdmin")
        .card(v-bind:style="{ 'background-color': color }")
          h2 Добавить запись в портфолио
          hr
          .content
            b-input-group(left="Заголовок")
              b-form-input(v-model="newItem.title")
            br
            b-input-group(left='Описание')
              b-form-input(v-model="newItem.description")
            b-button.btn.btn-success.btn-lg.addbtn(@click="addItem") Добавить
  
      .items
        
        .loading-cont(v-if="loading")
          .loading Загрузка
          
        .loading-error-cont(v-if="loadingError")
          .loading-error Извините, произошла ошибка при загрузке портфолио.
          
        .item(v-for="(item, index) in portfolioItems")
          .item-title
            h4 {{item.title}}
          .item-description
            | {{item.description}}
        
        
            
</template>


<script>

  import $ from 'jquery'
  
  export default {
    
    name: 'portfolio',

    props: {
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    
    methods: {
      
      getItems: function () {
        const that = this
        $.ajax({
          type: 'GET',
          url: '/api/portfolio/',
          success: function (res) {
            that.portfolioItems = res.items
            that.loading = false
          },
          error: function (err) {
            console.log('Error in getItems(): ', err)
            that.portfolioItems = []
            that.loading = false
            that.loadingError = true
          }
        })
      },
      
      resetNewItem: function () {
        this.newItem.title = ''
        this.newItem.description = ''
        this.newItem.priority = null
      },
      
      addItem: function () {
        const newItem = {
          title: this.newItem.title || 'Новая запись в портфолио',
          description: this.newItem.description || 'Описание новой записи в портфолио',
          priority: this.newItem.priority || (this.portfolioItems.length + 1),
          content: ''
        }
        this.resetNewItem()
        this.portfolioItems.unshift(newItem)
        // send new item to server
        const that = this
        $.ajax({
          url: '/api/portfolio/',
          type: 'POST',
          data: {
            title: newItem.title,
            description: newItem.description,
            priority: newItem.priority,
            content: newItem.content
          },
          error: function (err) {
            that.handleServerError('Error while sending new subtitle to server: ', err)
          }
        })
      },

      handleServerError: function (message, err) {
        if (message) {
          console.log(message)
        }
        if (err.responseJSON && err.responseJSON.error) {
          console.log(err.responseJSON.error)
        } else {
          console.log(err)
        }
        alert(this.serverErrorMessage)
      }
      
    },
    
    created: function () {
      this.getItems()
    },
    
    data () {
      return {
        newItem: {
          title: '',
          description: '',
          priority: null
        },
        portfolioItems: [],
        loading: true,
        loadingError: false,
        serverErrorMessage: 'Возникли проблемы при синхронизации ваших изменений с сервером. ' +
          'Проверьте ваше подключение.'
      }
    }
    
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  @import '../scss/variables.scss';
  
  .card {
    border-radius: 2px;
    border: none;
    padding: 2px;
    box-shadow: $card-shadow;
    background-color: #CFD8DC;
    h2 {
      margin: 13px 15px;
    }
    hr {
      border-top: 1px dashed #8c8b8b;
      display: block;
      width: 100%;
      border-bottom: none;
      margin-bottom: 2px;
      margin-top: 2px;
    }
    .content {
      background-color: #fff;
      padding: 20px 15px;
      border-radius: 2px;
    }
    .addbtn {
      position: relative;
      float: right;
      margin: 15px 0 0 0;
    }
  }
  
  .item {
    border-radius: 2px;
    border: none;
    box-shadow: $card-shadow-light;
    background-color: #fff;
    padding: 15px;
    cursor: pointer;
    .item-description {
      color: #777;
    }
  }
  .item+.item {
    margin-top: 16px;
  }

</style>
