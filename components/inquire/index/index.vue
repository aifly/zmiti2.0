<template>
  <div class="zmiti-meetingroom-main-ui lt-full">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>调查问卷</div>
        <div>
          <Button :loading="loading" @click="getDataList()" type="primary">刷新</Button>
          <Button type="primary" @click="add()">添加</Button>
        </div>
      </header>
      <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 130+'px' }">
        <section class="zmiti-list-where">
          <Input
            v-model="nameSearch"
            placeholder="请输入调察问卷名称"
            style="width:200px; margin-right:10px"
          ></Input>
          <div class="zmiti-search-dates">
            <DatePicker
              type="daterange"
              :start-date="new Date(2018, 12, 1)"
              placement="bottom-end"
              placeholder="选择时间段"
              style="width: 200px"
              @on-change="selectDates"
            ></DatePicker>
          </div>
          <Button icon="md-search" @click="searchHandle">搜索</Button>
        </section>
        <ZmitiTable
          :loading="loading"
          :dataSource="dataSource"
          :columns="columns"
          :change="change"
          :page-size="condition.page_size"
          :total="total"
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
  name: 'inquireindex',
  data () {
    return {
      imgs: window.imgs,
      inquireActions: zmitiUtil.inquireActions,
      company: zmitiUtil.getCurrentCompanyId(),
      total: 0,
      loading: false,
      viewH: window.innerHeight,
      productid: 0,
      nameSearch: '',
      beginTimeSearch: 0,
      endTimeSearch: 0,
      columns: [{
        title: "问卷标题",
        key: 'inquiretitle',
        align: 'center',
      }, {
        title: "开始时间",
        key: 'begintime',
        align: 'center',
        render: (h, params) => {
          return h('div', {}, zmitiUtil.formatDate(params.row.begintime))
        }
      }, {
        title: "结束时间",
        key: 'endtime',
        align: 'center',
        render: (h, params) => {
          return h('div', {}, zmitiUtil.formatDate(params.row.endtime))
        }
      }, {
        title: "是否实名",
        key: 'isrealname',
        align: 'center',
        render: (h, params) => {
          return h('div', {}, params.row.isrealname == 1 ? '实名' : '匿名')
        }
      }, {
        title: '描述',
        width: 200,
        key: 'abstract',
        align: 'center'
      }, {
        title: "创建时间",
        key: 'createtime',
        align: 'center',
        render: (h, params) => {
          return h('div', {}, zmitiUtil.formatDate(params.row.createtime))
        }
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        width: 200,
        render: (h, params) => {
          return h('div', [
            h('Poptip', {
              props: {
                confirm: true,
                title: "确定要删除吗？",
                placement: 'left'
              },
              on: {
                'on-ok': () => {
                  this.delete(params.row.roomid);
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
              ]),
            h('span', {
              style: {
                cursor: 'pointer',
                color: "rgb(0, 102, 204)",
                marginLeft: '10px'
              },
              on: {
                click: () => {
                  console.log(params.row)
                  this.$router.push({ name: 'inquiredetail', params: { productid: this.productid, isedit: 'edit', id: params.row.inquireid } })
                }
              }
            }, '编辑')
          ]);
        }
      }],
      dataSource: [],
      condition: {
        page_index: 0,
        page_size: 10,
      },
    }
  },
  components: {
    ZmitiTable
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
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
      }, 200);
    },
    selectDates (val) {//按时间段查询
      console.log(val, '选择的时间');
      this.beginTimeSearch = Date.parse(new Date(val[0])) / 1000;
      this.endTimeSearch = Date.parse(new Date(val[1])) / 1000;
      console.log(this.beginTimeSearch + ' ' + this.endTimeSearch, '选择的时间戳');
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
        inquiretitle: this.nameSearch,
        begintime: this.beginTimeSearch,
        endtime: this.endTimeSearch
      }, this.condition)
      zmitiUtil.ajax({
        remark: "getInquireList",
        data: {
          action: this.inquireActions.getInquireList.action,
          condition: conditions
        },
        error () {
          s.loading = false;
        },
        success (data) {
          s.loading = false;
          if (data.getret === 0) {
            s.total = data.total;
            s.dataSource = data.list;
          }
        }
      })
    },
    change (e) {
      this.condition.page_index = e - 1;
      this.getDataList();
    },
    delete (id) {
      var s = this;
      zmitiUtil.ajax({
        remark: 'delInquire',
        data: {
          action: this.inquireActions.delInquire.action,
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
    add () {//弹出侧弹框     
      this.$router.push({ name: 'inquiredetail', params: { productid: this.productid, isedit: 'add' } })
    },
    closeMaskPage () {//关闭侧弹框
      this.$refs['ruleForm'].resetFields();
      this.formObj.devices = [];
      this.formObj.roomlaber = [];
      Vue.obserable.trigger({ type: 'toggleMask', data: false });
    },
    adminAction (name) {//保存or 修改
      console.log(this.formObj)
      this.$refs[name].validate((valid) => {
        if (valid) {
          let action = this.formObj.roomid ? this.inquireActions.editInquire.action : this.inquireActions.addInquire.action;
          let info = {
            typeid: 3,//信息类型标识：0消息；1意见箱；2通知；3公告；4新闻；5资料
            status: 2,//-1所有 0表示禁用；1表示待审；2表示通过；3表示拒绝
            infoid: this.formObj.infoid,
            title: this.formObj.title,
            content: this.formObj.content,
            companyid: this.company.companyid,
            productid: this.productid
          }
          let s = this;
          zmitiUtil.ajax({
            remark: this.formObj.roomid ? 'editInquire' : 'addInquire',
            data: {
              action,
              info
            },
            success (data) {
              s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
              s.closeMaskPage();
              if (data.getret === 0) {
                s.getDataList();
              }
            }
          })
        }
      })
    },
  }
}
</script>
 