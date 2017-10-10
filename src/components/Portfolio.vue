<template lang="pug">
  
  #portfolio
    b-container.cont
      .max800.centered
  
        .loading-cont(v-if="loading")
          .loading
            .gear
  
        .loading-error-cont(v-else-if="loadingError")
          .loading-error Извините, произошла ошибка при загрузке портфолио.
          
        .loaded(v-else)
          
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
            transition-group(name="list-animated", tag="div")
              .item(
                v-for="(item, index) in portfolioItems",
                :key="item._id",
                class="list-animated-item",
                @click="handleItemClick(item._id)"
              )
                .item-title
                  h4 {{item.title}}
                .item-description
                  | {{item.description}}
                template(v-if="isAdmin")
                  .item-status(v-if="item.unsynced")
                    icon(name="spinner", spin)
                  .item-status(v-else-if="item.syncError")
                    icon(name="warning")
                  .item-status(v-else, @click="handleRemoveItemClick(index)")
                    icon(name="trash")
  
      // Item delete confirmation dialog
      b-modal(
        v-model="deleteConfirmationModal",
        title="Внимание",
        ok-title="Да",
        cancel-title="Отмена",
        @ok="handleDeleteOk",
        @cancel="handleDeleteCancel"
      )
        | Вы точно хотите удалить это из портфолио?
          
          
            
</template>


<script>

  import $ from 'jquery'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/trash'
  import 'vue-awesome/icons/spinner'
  import 'vue-awesome/icons/warning'

  export default {
    
    name: 'portfolio',

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
      
      getItems: function () {
        const that = this
        $.ajax({
          type: 'GET',
          url: '/api/portfolio/',
          success: function (res) {
            that.portfolioItems = res.items
            that.loading = false
            // console.log(res)
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
          content: '',
          unsynced: true,
          syncError: false
        }
        this.resetNewItem()
        this.portfolioItems.unshift(newItem)
        this.sendItemToServer(newItem)
      },
      
      handleRemoveItemClick: function (index) {
        this.deleteConfirmationModal = true
        this.itemToRemoveIndex = index
      },

      handleDeleteOk: function () {
        this.removeItem(this.itemToRemoveIndex)
      },
      handleDeleteCancel: function () {
        this.deleteConfirmationModal = false
        this.itemToRemoveIndex = null
      },
      
      removeItem: function (index) {
        const deletedItem = this.portfolioItems.splice(index, 1)[0]
        const that = this
        $.ajax({
          url: '/api/portfolio/' + deletedItem._id,
          type: 'DELETE',
          error: function (err) {
            that.handleServerError('Error while deleting portfolio item on server: ', err)
          }
        })
      },
      
      sendItemToServer: function (item) {
        if (!item) {
          console.log("Error in sendItemToServer(): 'item' argument is not provided")
        }
        const that = this
        $.ajax({
          url: '/api/portfolio/',
          type: 'POST',
          data: {
            title: item.title,
            description: item.description,
            priority: item.priority,
            content: item.content
          },
          success: function (res) {
            item.unsynced = false
            if (res.itemID) {
              item._id = res.itemID
            } else {
              item.syncError = true
              that.handleServerError('Error while sending new portfolio item to server: ',
                'Server did not return created portfolio item ID in response')
            }
          },
          error: function (err) {
            that.handleServerError('Error while sending new portfolio item to server: ', err)
            item.unsynced = false
            item.syncError = true
          }
        })
      },
      
      handleItemClick: function (itemID) {
        if (!itemID) return
        let to = '/portfolio/' + itemID
        this.$router.push(to)
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
        deleteConfirmationModal: false,
        itemToRemoveIndex: null,
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
    position: relative;
    cursor: pointer;
    .item-description {
      color: $font-color-secondary;
    }
  }
  .item+.item {
    margin-top: 16px;
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
