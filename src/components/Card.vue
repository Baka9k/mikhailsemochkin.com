<template lang="pug">
  
  b-col.card-cont(col, :lg="lg", :md="md", :sm="sm", :xs="xs")
    .card(v-bind:style="{ 'background-color': color }")
      h2 {{title}}
      hr
      p
        | {{content}}

</template>


<script>
  
  export default {
    
    name: 'card',

    props: {
      title: {
        type: String
      },
      color: {
        type: String,
        default: '#fff'
      },
      lg: {
        type: String,
        default: '4'
      },
      md: {
        type: String,
        default: '6'
      },
      sm: {
        type: String,
        default: '6'
      },
      xs: {
        type: String,
        default: '12'
      },
      content: {
        type: String
      }
    },
    
    data () {
      return {}
    }
    
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  .card-cont {
    padding: 20px 15px;
  }
  .card {
    border-radius: 2px;
    border: none;
    padding: 20px 15px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    h2 {
      margin: 0;
    }
    hr {
      border-top: 1px dashed #8c8b8b;
      display: block;
      width: 100%;
      border-bottom: none;
    }
  }

</style>
