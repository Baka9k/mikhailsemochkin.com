<template lang="pug">
  
  #contact
    b-container.cont
      b-row.max800.centered
        b-col.contact(col, cols="12")
          h4 Мои контакты
          hr
          .link(v-for="link in links", :key="link.href")
            .icon-cont
              icon(:name="link.icon")
            .link-cont
              | {{link.title}}:
              |
              a(:href="link.href") {{link.text}}
          



</template>


<script>
  
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/envelope'
  import 'vue-awesome/icons/github'
  import 'vue-awesome/icons/telegram'
  import 'vue-awesome/icons/phone-square'

  export default {

    name: 'contact',

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
      //
    },

    created: function () {
      //
    },

    data () {
      return {
        links: [
          {
            title: 'E-mail',
            icon: 'envelope',
            href: 'mailto:semochkin.mikhail@gmail.com',
            text: 'semochkin.mikhail@gmail.com'
          },
          {
            title: 'GitHub',
            icon: 'github',
            href: 'https://github.com/Baka9k',
            text: 'Baka9k'
          },
          {
            title: 'Телефон',
            icon: 'phone-square',
            href: 'tel:+79006352657',
            text: '+7-900-635-26-57'
          },
          {
            title: 'Telegram',
            icon: 'telegram',
            href: 'https://t.me/neoplan_spaceliner',
            text: 'Neoplan Spaceliner'
          }
        ]
      }
    }

  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  @import '../scss/variables.scss';
  
  .contact {
    border-radius: 2px;
    padding: 15px;
    box-shadow: $card-shadow-light;
    background-color: #fff;
    h4 {
      margin: 10px 0;
    }
    hr {
      border-top: 1px dashed #8c8b8b;
      display: block;
      width: 100%;
      border-bottom: none;
      margin-bottom: 20px;
      margin-top: 4px;
    }
  }
  
  .link, .icon-cont, .link-cont {
    position: relative;
    float: left;
  }
  .link {
    clear: both;
    padding: 0.33rem 0;
  }
  .link-cont {
    font-weight: 600;
  }
  .icon-cont {
    margin-right: 6px;
  }

  a {
    color: #2196F3;
    &:visited {
      color: #673AB7;
    }
  }

</style>
