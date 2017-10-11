<template lang="pug">
  
  #portfolio-item
    b-container.cont
      b-col.item(col, cols="12")
      
        .close-item(@click="handleCloseItemClick")
          .close-icon-cont
            icon(name="remove")
      
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
              b-col(col, sm="6", cols="12")
                b-form-select.priority(v-model="item.priority")
                  template(slot="first")
                    // this slot appears above the options from 'options' prop
                    option(:value="null", disabled) -- Приоритет --
                  option(v-for="i in maxPriority", :value="i") {{i}}
                .item-status(v-if="unsynced")
                  icon(name="spinner", spin)
                .item-status(v-else-if="syncError")
                  icon(name="warning")
                .item-status(v-else)
                  icon(name="check-square-o")
              b-col(col, sm="6", cols="12")
                b-button.btn.btn-success.btn-lg.addbtn(@click="handleSaveClick") Сохранить изменения
            .item-content
              trumbowyg(
                :content="item.content",
                @tbwchange="updateItemContent"
              )
            hr

          // What users see
          .show-item(v-html="item.content")
  
              
            
</template>


<script>

  import $ from 'jquery'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/spinner'
  import 'vue-awesome/icons/warning'
  import 'vue-awesome/icons/check-square-o'
  import 'vue-awesome/icons/remove'
  import Trumbowyg from '@/components/Trumbowyg'

  export default {
    
    name: 'portfolioItem',

    props: {
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    
    components: {
      Icon,
      Trumbowyg
    },
    
    methods: {
      
      getItem: function () {
        const that = this
        const url = '/api/portfolio/' + that.itemID
        $.ajax({
          type: 'GET',
          url: url,
          success: function (res) {
            that.item = res.item
            that.maxPriority = res.maxPriority
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
      
      handleSaveClick: function () {
        this.unsynced = true
        this.sendUpdatedItemToServer()
      },
      
      sendUpdatedItemToServer: function () {
        const that = this
        const item = that.item
        const url = '/api/portfolio/' + that.itemID
        // console.log('Item sent to server: ', item)
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
            that.unsynced = false
            if (!res.itemID || !(res.itemID === item._id)) {
              that.syncError = true
              that.handleServerError('Error while sending updated portfolio item to server: ',
                'Server did not return updated portfolio item ID in response')
            }
          },
          error: function (err) {
            that.handleServerError('Error while sending updated portfolio item to server: ', err)
            that.unsynced = false
            that.syncError = true
          }
        })
      },

      updateItemContent: function (content) {
        this.item.content = content
      },

      handleCloseItemClick: function () {
        this.$router.push('/portfolio')
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
        maxPriority: 1,
        loading: true,
        loadingError: false,
        unsynced: false,
        syncError: false,
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
  
  #portfolio-item {
    /deep/ .show-item {
      img {
        max-width: 100%;
        border: solid 1px #ddd;
        margin: 10px 20px 10px 0;
      }
    }
    .close-item {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
      border: solid 2px $font-color-secondary;
      color: $font-color-secondary;
      border-radius: 50%;
      cursor: pointer;
      /deep/ .close-icon-cont {
        width: 40px;
        height: 40px;
        text-align: center;
        .fa-icon {
          width: 30px;
          height: 30px;
          margin: auto;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
  
  .item {
    border-radius: 2px;
    border: none;
    background-color: #fff;
    padding: 60px 20px 30px 20px;
    box-shadow: $card-shadow-light;
    h4 {
      margin: 10px 0;
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
    border: solid 1px $font-color-secondary;
    border-radius: 2px;
    width: 40px;
    height: 40px;
    text-align: center;
    position: relative;
    margin-top: 8px;
    margin-left: 10px;
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
  
  .priority, .item-status {
    position: relative;
    float: left;
    clear: none;
  }

</style>
