<template lang="pug">
  
  #portfolio-item
    b-container.cont
      b-row.max800.centered
        b-col.item
        
          .loading-cont(v-if="loading")
            .loading
              .gear
  
          .loading-error-cont(v-else-if="loadingError")
            .loading-error
              | Извините, произошла ошибка при загрузке записи в портфолио.
  
          .loaded(v-else)
            
            // What admins see
            .edit-item(v-if="isAdmin")
              b-input-group.field(left="Заголовок")
                b-form-input(v-model="item.title")
              b-input-group.field(left='Описание')
                b-form-input(v-model="item.description")
              b-row
                b-col(cols="6")
                  b-form-select.priority(v-model="item.priority")
                    template(slot="first")
                      // this slot appears above the options from 'options' prop
                      option(:value="null", disabled) -- Приоритет --
                    option(v-for="i in (item.maxPriority)", :value="i") {{i}}
                b-col(cols="6")
                  b-button.btn.btn-success.btn-lg.addbtn(@click="saveItem") Сохранить изменения
              .item-content
                // Content
  
              // What users see
              .show-item(v-html="item.content")
  
              
            
</template>


<script>

  import $ from 'jquery'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/spinner'
  import 'vue-awesome/icons/warning'

  export default {
    
    name: 'portfolioItem',

    props: {
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    
    components: {
      Icon
    },
    
    methods: {
      
      getItem: function () {
        const that = this
        const url = '/api/portfolio/' + that.itemID
        $.ajax({
          type: 'GET',
          url: url,
          success: function (res) {
            that.item = res
            that.loading = false
            // console.log(res)
          },
          error: function (err) {
            console.log('Error in getItem(): ', err)
            that.item = null
            that.loading = false
            that.loadingError = true
          }
        })
      },
      
      sendUpdatedItemToServer: function () {
        const that = this
        const item = that.item
        const url = '/api/portfolio/' + that.itemID
        $.ajax({
          url: url,
          type: 'PUT',
          data: {
            title: item.title,
            description: item.description,
            priority: item.priority,
            content: item.content
          },
          success: function (res) {
            item.unsynced = false
            if (!res.itemID || !(res.itemID === item._id)) {
              item.syncError = true
              that.handleServerError('Error while sending updated portfolio item to server: ',
                'Server did not return updated portfolio item ID in response')
            }
          },
          error: function (err) {
            that.handleServerError('Error while sending updated portfolio item to server: ', err)
            item.unsynced = false
            item.syncError = true
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
      this.getItem()
    },
    
    data () {
      return {
        item: null,
        itemID: this.$route.params.id,
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
  @import '../scss/loading-gears.scss';
  @import '../scss/animations.scss';
  
  #portfolio {
    overflow-x: hidden;
  }
  
  .item {
    border-radius: 2px;
    border: none;
    background-color: #fff;
    padding: 20px 15px;
    box-shadow: $card-shadow-light;
    h4 {
      margin: 10px 0;
    }
    hr {
      border-top: 1px dashed #8c8b8b;
      display: block;
      width: 100%;
      border-bottom: none;
      margin-bottom: 2px;
      margin-top: 2px;
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
  
  .field+.field {
    margin-top: 10px;
  }
  
  /deep/ .item-status {
    .fa-icon {
      width: 25px;
      height: 25px;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    color: $font-color-secondary;
    position: absolute;
    top: 15px;
    right: 15px;
    border: solid 1px $font-color-secondary;
    border-radius: 2px;
    width: 40px;
    height: 40px;
    text-align: center;
  }

  @media (max-width: 379px) {
    h4 {
      font-size: 1rem;
    }
    /deep/ .edit-item {
      .input-group-addon {
        padding: .1rem .4rem;
        font-size: 0.8rem;
      }
      .form-control {
        padding: .4rem .75rem;
        font-size: 0.8rem;
      }
    }
    .addbtn {
      padding: 2px 12px;
    }
  }

</style>
