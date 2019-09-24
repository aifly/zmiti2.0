<template>
  <div>
    <Table :columns="columns" :data="options"></Table>
  </div>
</template>
<script>
export default {
  props: ['options'],
  data () {
    return {
      columns: [
        {
          key: 'optionsid',
          type: 'index',
          width: 50
        }, {
          title: "图片",
          key: 'optionsurl',
          width: 150,
          render: (h, params) => {
            let url = params.row.optionsurl;
            if (url != "") {
              return h('img', {
                attrs: {
                  src: url
                },
                style: {
                  height: '100px',
                  margin: '5px'
                }
              })
            } else {
              return h('span', {}, '')
            }
          }
        }, {
          title: "选项",
          key: 'options',
          align: 'left',
        }, {
          title: "选择人数",
          key: 'number',
          align: 'left',
          width: 100
        },
        {
          title: "百分比",
          key: 'percent',
          align: 'left',
          width: 200,
          render: (h, params) => {
              return h('Progress', {
                props:{
                  percent:Number(params.row.percent.toFixed(2))
                }
              })
          }
        }],
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
 