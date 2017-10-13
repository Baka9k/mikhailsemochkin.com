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

    props: {
      isAdmin: {
        type: Boolean,
        default: false
      }
    },

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
            'создавать красивые и удобные сайты.</p><p>Работал как с front-end (создание лендингов, ' +
            'программирование калькуляторов и корзин в интернет-магазинах, графика на canvas), так и с back-end' +
            ' (разработка серверов на Node.js, работа с базами данных, обработка сервером платежей с ' +
            'помощью API Яндекс.Кассы).<p>Много работал с Vue, понимаю как программировать на реактивных ' +
            'фреймворках, знаю и практикую современные принципы web-разработки (git, npm, ' +
            'cистемы сборки, минификация и конкатенация стилей и скриптов, css-переменные, автопрефиксеры...</p>'
          },
          {
            title: 'Навыки',
            color: '#D1C4E9',
            lg: '4',
            md: '6',
            sm: '6',
            xs: '12',
            content: '<h4>Верстка</h4>HTML5, CSS3, Bootstrap, Materialize, LESS, SASS' +
            '<h4>Front-end</h4>JavaScript (включая ECMAScript 6 features), JQuery, Vue, React' +
            '<h4>Back-end</h4>Node.js, Express, Passport, Pug, SQLite3, MongoDB, PostgreSQL' +
            '<h4>Администрирование и деплой</h4>Debian, Ubuntu/Ubuntu Server, ssh, AWS, nginx' +
            '<h4>Инструменты сборки и разработки</h4>git, gulp, npm, nvm, grunt, webpack'
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
            '<h4>Гражданство</h4>Российская Федерация' +
            '<h4>Резюме</h4><a href="https://spb.hh.ru/resume/a2a33103ff03627e0d0039ed1f4d4836547330#key-skills">' +
            'Смотреть резюме на hh.ru</a>'
          }
        ]
      }
    }
    
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  @import '../scss/variables.scss';
  

</style>
