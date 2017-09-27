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
    
    methods: {
      getAge: function (dateString) {
        const today = new Date()
        const birthDate = new Date(dateString)
        let age = today.getFullYear() - birthDate.getFullYear()
        let m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
        // console.log(age)
        return age
      }
    },
    
    data () {
      let age = this.getAge('1995-11-20')
      return {
        cards: [
          {
            title: 'Обо мне',
            color: '#B2EBF2',
            lg: '4',
            md: '6',
            sm: '6',
            xs: '12',
            content: '<p>Меня зовут Михаил Семочкин, и я web-разрабочик. Я люблю программировать на JavaScript и ' +
            'создавать красивые и удобные интерфейсы.</p><p>Могу с нуля сделать, например, интернет-магазин со сложными ' +
            'калькуляторами, формами, кассой с оплатой Яндекс.Деньгами, на ' +
            'Docker + Node + MongoDB/PostgreSQL + Express на бекенде, и React/Vue/Ractive + Bootstrap/Materialize' +
            ' на фронтенде, и' +
            ' со сборкой с помощью Gulp/Webpack, препроцессингом стилей SCSS/LESS, минификацией JavaScript и' +
            ' всеми прочими вещами, которые нужны современному сайту.</p>'
          },
          {
            title: 'Возраст',
            color: '#D1C4E9',
            lg: '4',
            md: '6',
            sm: '6',
            xs: '12',
            content: '<p>' + age + '</p>'
          },
          {
            title: 'Обо мне',
            color: '#B2EBF2',
            lg: '4',
            md: '6',
            sm: '6',
            xs: '12',
            content: 'Я молодец'
          },
          {
            title: 'Обо мне',
            color: '#B2EBF2',
            lg: '4',
            md: '6',
            sm: '6',
            xs: '12',
            content: 'Я молодец'
          },
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
