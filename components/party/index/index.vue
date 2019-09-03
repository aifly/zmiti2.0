<template>
  <div class="zmiti-party-main-ui">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>活动列表</div>
        <div>
          <Button :loading="loading" @click="getDataList()" type="primary">刷新</Button>
          <Button type="primary" @click="add()">添加</Button>
        </div>
      </header>
      <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 130+'px' }">
        <section class="zmiti-list-where">
            <Select v-model="statusSearch" style="width:200px; margin-right:10px">
              <Option :value="item.value" :lable='item.label' v-for="(item,i) in status" :key="i">{{item.label}}</Option>
            </Select>
            <Button icon="md-search" @click="searchHandle">搜索</Button>
          </section>
        <ZmitiTable
          :loading="loading"
          :dataSource="dataSource"
          :columns="columns"
          :change="change"
          :page-size="condition.page_size"
          :total="total"
          @getSelection="getSelection"
        ></ZmitiTable>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>

<script>
import Vue from 'vue';
import zmitiUtil from '../../../common/lib/util';
import ZmitiTable from '../../../common/table';
export default {
  props: ['obserable'],
  name: 'zmitiindex',
  data () {
    return {
      imgs: window.imgs,
      partyActions: zmitiUtil.partyActions,
      company: zmitiUtil.getCurrentCompanyId(),
      total: 0,
      loading: true,
      viewH: window.innerHeight,
      dataSource: [],
      statusSearch:-1,
      status:[{
          value:-1,
          label:'全部活动'
        },{
          value:1,
          label:'有效活动'
        },{
          value:0,
          label:'无效活动'
      }],
      columns: [
        {
          title: "编号",
          key: 'partyid',
          align: 'left',
          width: 68
        },
        {
          title: "活动名称",
          key: 'partyname',
          align: 'left',
        },
        {
          title: "活动描述",
          key: 'abstract',
          align: 'left',
        },
        {
          title: "开始时间",
          key: 'begintime',
          align: 'left',
          render:(h,params)=>{            
            return h('div',{},zmitiUtil.formatDate(params.row.begintime));
          }
        },
        {
          title: "结束时间",
          key: 'enteredtime',
          align: 'left',
          render:(h,params)=>{
            return h('div',{},zmitiUtil.formatDate(params.row.enteredtime));
          }
        },
        {
          title: "状态",
          key: 'status',
          align: 'left',
          render:(h,params)=>{
            return h('div',{},(params.row.status==1?'有效活动':'无效活动'));
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 180,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  cursor: 'pointer',
                  color: "rgb(0, 102, 204)",
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({ name: 'partydetail', params: { productid: this.productid, isedit: 'edit', id: params.row.partyid } })
                  }
                }
              }, '编辑'),
              h('span', {
                style: {
                  cursor: 'pointer',
                  color: "rgb(0, 102, 204)",
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({ name: 'partyexport', params: { productid: this.productid, id: params.row.partyid } })
                  }
                }
              }, '报名列表'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: "确定要删除吗？",
                  placement: 'left'

                },
                on: {
                  'on-ok': () => {
                    this.delete(params.row.partyid);
                  },

                }
              }, [
                  h('span', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      cursor: 'pointer',
                      color: '#06C'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  }, '删除')
                ])
            ]);
          }
        }
      ],
      condition: {
        page_index: 0,
        page_size: 10,
      },
      userinfo: {},
      selectList: [],
      productid: 0,
    }
  },
  components: {
    ZmitiTable
  },
  mounted () {
    window.s = this;
    var userinfo = zmitiUtil.getUserInfo();
    if (!userinfo) {
      this.$router.push({ path: '/login' })
    }
    var t = setInterval(() => {
      if (Vue.productList) {
        clearInterval(t);
        if (!this.productid) {
          Vue.productList.forEach(p => {
            if (this.$route.name.indexOf(p.producturl.substr(1)) > -1) {
              this.productid = p.productid;
            }
          })
          if (this.productid) {
            this.getDataList();
          }
        }
      }
    }, 100);
  },
  methods: {
    add () {
      this.$router.push({ name: 'partydetail', params: { productid: this.productid, isedit: 'add' } })
    },
    change (e) {
      this.condition.page_index = e - 1;
      this.getDataList();
    },
    delete (id) {
      var s = this;
      zmitiUtil.ajax({
        remark: 'delParty',
        data: {
          action: this.partyActions.delParty.action,
          condition: {
            partyid: id,
            companyid: this.company.companyid,
            productid: this.productid
          }
        },
        success (data) {
          s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
          if (data.getret === 0) {
            s.getDataList();
          }
        }
      })
    },
    change (e) {
      this.condition.page_index = e - 1;
      this.getDataList();
    },
    searchHandle () {//搜索
      this.getDataList();
    },
    getDataList () {
      let s = this;
      s.loading = true;
      let conditions = Object.assign({
        companyid: this.company.companyid,
        productid: this.productid,
        status: this.statusSearch
      }, this.condition)
      zmitiUtil.ajax({
        remark: "getPartyList",
        data: {
          action: this.partyActions.getPartyList.action,
          condition: conditions
        },
        error () {
          s.loading = false;
        },
        success (data) {
          s.loading = false;
          if (data.getret === 0) {
            //  s.total = data.total;
            s.dataSource = data.list;
          }
        }
      })
    },
    getSelection (data) {
      this.selectList = data;
    }
  }
}
</script>