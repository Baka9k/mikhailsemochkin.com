<template lang="pug">
  
  b-container.cont
    b-row
      b-col(col xs="12").timeline
        .entry
          .title
            h3 осень 2016 - лето 2017
            p.company #frenchrabbit
            p.company-site
              a(href="https://frenchrabbit.ru") frenchrabbit.ru
          .body
            p
              | Frontend-разработчик/верстальщик
            ul
              li Верстка лендингов и сайтов
              li Создание сложных форм и интерфейсов на реактивных фреймворках
              li
                | Участие в разработке сайтов
                a(href="https://gts76.ru")
                  |  gts76.ru,
                a(href="http://smokekitchen.ru")
                  |  smokekitchen.ru,
                a(href="https://redvape.ru")
                  |  redvape.ru,
                a(href="http://trix.world/#/")
                  |  trix.world
        
</template>


<script>
  
  export default {
    
    name: 'experience',
    
    data () {
      return {}
    }
    
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  $gutter: 30px;
  $border-width: 4px;
  $dot-diameter: 8px;
  
  .timeline {
    position: relative;
    float: left;
    background-color: #ECEFF1;
    border-radius: 2px;
    padding: 20px 15px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left:calc(33% + 15px); //$gutter/2
      bottom: 0;
      width: $border-width;
      background: #ddd;
    }
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }
  
  .entry {
    clear: both;
    text-align: left;
    position: relative;
    .title {
      margin-bottom: .5em;
      float: left;
      width: 33%;
      padding-right: $gutter;
      text-align: right;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: $dot-diameter;
        height: $dot-diameter;
        border: $border-width solid salmon;
        background-color:#fff;
        border-radius:100%;
        top: 15%;
        right: -$dot-diameter;
        z-index: 99;
      }
      h3 {
        margin: 0;
        font-size: 120%;
      }
      p {
        margin: 0;
        font-size: 100%;
      }
    }
    .body {
      margin: 0 0 3em;
      float: right;
      width: 66%;
      padding-left: $gutter;
      p {
        line-height: 1.4em;
        &:first-child {
          margin-top: 0;
          font-weight: 400;
        }
      }
      ul {
        color:#aaa;
        padding-left: 0;
        list-style-type: none;
        li:before {
          content: "–";
          margin-right: .5em;
        }
      }
    }
  }


</style>
