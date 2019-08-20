<template>
  <div>
    <script :id="id" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      id: { // 唯一识别码，必须
        type: String,
        required: true
      },
      defaultMsg: { // 初始化内容
        type: String,
        default: ''
      },
      config: { // ue配置对象，如有需要可以提供由父组件传入
        type: Object
      }
    },
    watch: {
      defaultMsg: function(newText) { // 有可能数据是异步获得晚于 ueditor ready，避免导致初始化失败
        if(this.editor && this.editor.isReady) { // 确保 ueditor 已初始化完毕
          var newContent = this.editor.getContent()
          if(newText !== newContent) {
            this.editor.setContent(newText)
          }
        }
      }
    },
    mounted () {
      var that = this
      var configObj = { initialFrameHeight: 300, initialFrameWidth: 400 }
      function extend (to, _from) {
        for (var key in _from) {
          if(_from.hasOwnProperty(key)) {
            to[key] = _from[key]
          }
        }
        return to
      }
      extend(configObj, this.config || {}) //简单扩展配置
      this.editor = window.UE.getEditor(this.id, configObj) // 初始化UE
      this.editor.addListener('ready', function () {
        that.defaultMsg && that.editor.setContent(that.defaultMsg) // 初始化内容
      })
      this.editor.addListener('contentChange', function () {
        var newContent = that.editor.getContent()
        if(that.defaultMsg !== newContent) {
          that.$emit('contentChanged', newContent) // 内容改变及时更新父组件
        }
      })
    },
    destroyed () {
      this.editor.destroy()
    }
  }
</script>