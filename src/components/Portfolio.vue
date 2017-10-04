<template lang="pug">
  
  div
    b-container.cont
    
      .add-item(v-if="isAdmin")
        .card(v-bind:style="{ 'background-color': color }")
          h2 Добавить запись в портфолио
          hr
          .content
            b-input-group(left="Заголовок")
              b-form-input(v-model="newItemTitle")
            br
            b-input-group(left='Описание')
              b-form-input(v-model="newItemDescription")
            b-button.btn.btn-success.btn-lg.addbtn(@click="addItem") Добавить
  
      .items
        
            
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
            that.portfolioItems = res.portfolioItems
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
      addItem: function () {
      
      }
    },
    
    data () {
      return {
        newItemTitle: '',
        newItemDescription: '',
        portfolioItems: [],
        loading: true,
        loadingError: false
      }
    }
    
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  .card {
    border-radius: 2px;
    border: none;
    padding: 2px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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

</style>
