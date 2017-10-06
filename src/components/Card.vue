<template lang="pug">
  
  b-col.card-cont(col, :lg="lg", :md="md", :sm="sm", :cols="xs")
    .card(v-bind:style="{ 'background-color': color }")
      h2 {{title}}
      hr
      .content(v-html="content")

</template>


<script>
  
  export default {
    
    name: 'card',

    props: {
      title: {
        type: String,
        default: ' '
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
  
  @import '../scss/variables.scss';
  
  .card-cont {
    padding: 20px 15px;
    @media (max-width: 768px) {
      padding: 12px 15px;
    }
  }
  .card {
    border-radius: 2px;
    border: none;
    padding: 2px;
    box-shadow: $card-shadow;
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
    /deep/ .content {
      background-color: #fff;
      padding: 20px 15px;
      border-radius: 2px;
      p {
        margin-top: 0;
        margin-bottom: 0;
      }
      p + p {
        margin-top: 16px;
      }
      h4 {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 0.4rem;
        margin-top: 0.9rem;
      }
      h4:first-child {
        margin-top: 0;
      }
    }
  }

</style>
