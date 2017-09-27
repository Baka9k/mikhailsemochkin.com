<template lang="pug">
  
  div
    b-container.cont
      b-row
        card(
          v-for="(card, index) in cards",
          :title="card.title",
          :color="card.color",
          :lg="card.lg",
          :md="card.md",
          :sm="card.sm",
          :xs="card.xs",
          :content="card.content",
          :key="index"
        )
  
</template>


<script>

  import Card from '@/components/Card'
  
  export default {
    
    name: 'about',

    components: {
      Card
    },
    
    data () {
      return {
        cards: [
          {
            title: 'Обо мне',
            color: '#B2EBF2',
            lg: '4',
            md: '6',
            sm: '6',
            xs: '12',
            content: 'Я молодец'
          }
        ]
      }
    }
    
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  .cont {
    padding-top: 30px;
    padding-bottom: 30px;
  }

</style>
