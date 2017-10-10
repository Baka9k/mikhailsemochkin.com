<template lang="pug">
  
  #trumbowyg-editor
  
</template>



<script>

  import 'trumbowyg'
  import $ from 'jquery'
  import icons from 'trumbowyg/dist/ui/icons.svg'
  import 'trumbowyg/dist/langs/ru.min.js'
  import 'trumbowyg/dist/plugins/base64/trumbowyg.base64'
  import 'trumbowyg/dist/plugins/cleanpaste/trumbowyg.cleanpaste'
  import 'trumbowyg/dist/plugins/colors/trumbowyg.colors'
  import 'trumbowyg/dist/plugins/emoji/trumbowyg.emoji'
  import 'trumbowyg/dist/plugins/insertaudio/trumbowyg.insertaudio'
  import 'trumbowyg/dist/plugins/noembed/trumbowyg.noembed'
  import 'trumbowyg/dist/plugins/pasteimage/trumbowyg.pasteimage'
  import 'trumbowyg/dist/plugins/preformatted/trumbowyg.preformatted'
  import 'trumbowyg/dist/plugins/table/trumbowyg.table'
  import 'trumbowyg/dist/plugins/template/trumbowyg.template'
  import 'trumbowyg/dist/plugins/upload/trumbowyg.upload'

  export default {

    name: 'trumbowyg',

    props: {
      content: {
        type: String,
        default: ''
      }
    },

    mounted () {
      this.init()
    },

    methods: {
      
      init () {
        $.trumbowyg.svgPath = icons

        const config = {
          btnsDef: {
            // Customizables dropdowns
            image: {
              dropdown: ['insertImage', 'upload', 'base64', 'noEmbed'],
              ico: 'insertImage'
            }
          },
          btns: [
            ['viewHTML'],
            ['undo', 'redo'],
            ['formatting'],
            'btnGrp-design',
            ['link'],
            ['image'],
            'btnGrp-justify',
            'btnGrp-lists',
            ['foreColor', 'backColor'],
            ['preformatted'],
            ['horizontalRule'],
            ['fullscreen']
          ],
          plugins: {
            upload: {
              /*
              // Add imgur parameters to upload plugin
              serverPath: 'https://api.imgur.com/3/image',
              fileFieldName: 'image',
              headers: {
                'Authorization': 'Client-ID 9e57cb1c4791cea'
              },
              urlPropertyName: 'data.link'
              */
              serverPath: '/api/uploadimg',
              fileFieldName: 'image',
              urlPropertyName: 'path',
              statusPropertyName: 'success'
            }
          },
          lang: 'ru'
        }

        $('#trumbowyg-editor')
          .trumbowyg(config)
          .on('tbwchange', this.onChange)
          .trumbowyg('html', this.content)
      },

      onChange () {
        const $trumbowyg = $('#trumbowyg-editor')
        const content = $trumbowyg.trumbowyg('html')
        this.$emit('tbwchange', content)
      },

      updateContent: function () {
        const $trumbowyg = $('#trumbowyg-editor')
        $trumbowyg.trumbowyg('html', this.content)
      }

    }

  }

</script>



<style lang="scss">

  @import '~trumbowyg/dist/ui/sass/trumbowyg.scss';
  @import '../scss/variables.scss';

  .trumbowyg-fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    z-index: 99999;
  }

  .trumbowyg-upload-dropdown-button {
    display: inline-block !important;
  }

</style>
