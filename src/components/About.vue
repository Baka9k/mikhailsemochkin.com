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
            title: 'Навыки',
            color: '#D1C4E9',
            lg: '4',
            md: '6',
            sm: '6',
            xs: '12',
            content: '<h4>Верстка</h4>HTML5, CSS3, Bootstrap, Materialize, LESS, SCSS' +
            '<h4>Фронтенд</h4>JS ES5/ES6/ES7, Vue, React, Ractive, JQuery' +
            '<h4>Бекэнд</h4>Node.js, npm, nvm, Express, Passport, Pug' +
            '<h4>Базы данных</h4>SQLite3, MongoDB, PostgeSQL' +
            '<h4>Администрирование и деплой</h4>Debian, Ubuntu, Ubuntu Server, ssh, AWS, nginx' +
            '<h4>Инструменты сборки и разработки</h4>git, gulp, grunt, webpack'
          },
          {
            title: 'Разное',
            color: '#F8BBD0',
            lg: '4',
            md: '6',
            sm: '6',
            xs: '12',
            content: '<h4>Возраст</h4>' + (age || 21) +
            '<h4>Местоположение</h4>Санкт-Петербург, Россия' +
            '<h4>Гражданство</h4>Российская Федерация'
          },
          {
            title: 'Резюме',
            color: '#ffcdd2',
            lg: '4',
            md: '6',
            sm: '6',
            xs: '12',
            content: '<a href="/static/files/resume.pdf">Скачать резюме</a>'
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
