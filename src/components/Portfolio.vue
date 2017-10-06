<template lang="pug">
  
  div
    b-container.cont
      .max800.centered
        
        .add-item(v-if="isAdmin")
          .card(v-bind:style="{ 'background-color': color }")
            h4 Добавить запись в портфолио
            hr
            .content
              b-input-group.field(left="Заголовок")
                b-form-input(v-model="newItem.title")
              b-input-group.field(left='Описание')
                b-form-input(v-model="newItem.description")
              b-row
                b-col(cols="6")
                  b-form-select.priority(v-model="newItem.priority")
                    template(slot="first")
                      // this slot appears above the options from 'options' prop
                      option(:value="null", disabled) -- Приоритет --
                    option(v-for="i in (portfolioItems.length+1)", :value="i") {{i}}
                b-col(cols="6")
                  b-button.btn.btn-success.btn-lg.addbtn(@click="addItem") Добавить
    
  
        .items
          
          .loading-cont(v-if="loading")
            .loading
              .gear
            
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
          priority: parseInt(this.newItem.priority) || (this.portfolioItems.length + 1),
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
    box-shadow: $card-shadow-light;
    background-color: #CFD8DC;
    h4 {
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
      padding: 5px 10px;
    }
    .addbtn, .priority {
      margin-top: 10px;
    }
    .priority {
      max-width: 170px;
      border-radius: 2px;
    }
  }
  
  .add-item {
    margin-bottom: 26px;
  }
  
  .field+.field {
    margin-top: 10px;
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

  @media (max-width: 379px) {
    h4 {
      font-size: 1rem;
    }
    /deep/ .add-item {
      .input-group-addon {
        padding: .1rem .4rem;
        font-size: 0.8rem;
      }
      .form-control {
        padding: .4rem .75rem;
        font-size: 0.8rem;
      }
    }
    .card .addbtn {
      padding: 2px 12px;
    }
    .item+.item {
      margin-top: 10px;
    }
  }

</style>
