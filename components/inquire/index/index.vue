<template>
  <div class="zmiti-meetingroom-main-ui lt-full">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>问卷调查</div>
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
    <ZmitiMask v-model="showDetailPage" @closeMaskPage="closeMaskPage">
      <div slot="mask-content">
        <transition name="detail">
          <section class="zmiti-add-form zmiti-scroll">
            <header class="zmiti-add-header">
              <img :src="imgs.back" alt @click="closeMaskPage" />
              <span>调查问卷信息</span>
            </header>
            <Form
              :model="formObj"
              :label-width="120"
              :rules="ruleValidate"
              ref="ruleForm"
              class="zmiti-add-form-C"
            >
              <input v-model="formObj.inquireid" type="hidden" />
              <FormItem label="问卷标题：" prop="inquiretitle">
                <Input v-model="formObj.inquiretitle" placeholder="活动名称"></Input>
              </FormItem>

              <FormItem label="开始时间：" prop="begintime">
                <DatePicker
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  v-model="formObj.begintime"
                  placeholder="开始时间"
                ></DatePicker>
              </FormItem>
              <FormItem label="结束时间：" prop="endtime">
                <DatePicker
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  v-model="formObj.endtime"
                  placeholder="结束时间"
                ></DatePicker>
              </FormItem>
              <FormItem label="是否实名：" prop="isrealname">
                <RadioGroup v-model="formObj.isrealname">
                  <Radio :label="0">否</Radio>
                  <Radio :label="1">是</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="描述：" prop="abstract">
                <Input
                  v-model="formObj.abstract"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                ></Input>
              </FormItem>
            </Form>
            <div class="zmiti-add-form-item zmiti-add-btns">
              <Button
                size="large"
                type="primary"
                @click="adminAction('ruleForm')"
              >{{formObj.infoid?'保存':'确定'}}</Button>
            </div>
          </section>
        </transition>
      </div>
    </ZmitiMask>
  </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<script>

import Vue from 'vue';
import zmitiUtil from '../../../common/lib/util';
import ZmitiTable from '../../../common/table';
import ZmitiMask from '../../../common/mask';
export default {
  props: ['obserable'],
  name: 'inquireindex',
  data () {
    let timeValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入问卷调查开始/结束时间"));
      }
      var date1 = new Date(value);
      if (rule.fullField == 'begintime' && this.formObj.endtime != "" && date1.getTime() >= new Date(this.formObj.endtime).getTime()) {
        return callback(new Error("问卷调查开始时间不能大于结束时间"));
      }
      if (rule.fullField == 'endtime' && this.formObj.begintime != "" && date1.getTime() <= new Date(this.formObj.begintime).getTime()) {
        return callback(new Error("问卷调查结束时间不能小于开始时间"));
      }
      return callback();
    }
    return {
      showDetailPage: -1,
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
      formObj: {
        inquireid: undefined,
        inquiretitle: '',
        isrealname: 0,
        begintime: '',
        endtime: '',
        abstract: ''
      },
      ruleValidate: {
        inquiretitle: [{ required: true, message: '请输入问卷调查名称', trigger: 'blur' }],
        begintime: [{ required: true, validator: timeValidate, trigger: 'change' }],
        endtime: [{ required: true, validator: timeValidate, trigger: 'change' }],
      },
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
        width: 220,
        render: (h, params) => {
          return h('div', [
            h('span', {
              style: {
                cursor: 'pointer',
                color: "rgb(0, 102, 204)"                
              },
              on: {
                click: () => {
                  this.formObj = {
                    inquireid: params.row.inquireid,
                    inquiretitle: params.row.inquiretitle,
                    isrealname: params.row.isrealname,
                    begintime: new Date(params.row.begintime * 1000),
                    endtime: new Date(params.row.endtime * 1000),
                    abstract: params.row.abstract
                  }
                  Vue.obserable.trigger({
                    type: 'toggleMask',
                    data: true
                  })
                }
              }
            }, '编辑'),
             h('span', {
              style: {
                cursor: 'pointer',
                color: "rgb(0, 102, 204)",
                marginLeft: '10px'
              },
              on: {
                click: () => {
                  this.$router.push({ name: 'inquirequestionlist', params: { productid: this.productid, id: params.row.inquireid } })
                }
              }
            }, '问题列表'),
            h('span', {
              style: {
                cursor: 'pointer',
                color: "rgb(0, 102, 204)",
                marginLeft: '10px'
              },
              on: {
                click: () => {
                  this.$router.push({ name: 'inquireuserlist', params: { productid: this.productid, id: params.row.inquireid } })
                }
              }
            }, '用户调查'),
            h('Poptip', {
              props: {
                confirm: true,
                title: "确定要删除吗？",
                placement: 'left'
              },
              on: {
                'on-ok': () => {
                  this.delete(params.row.inquireid);
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
                    color: '#06C',
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '删除')
              ])
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
    ZmitiTable,
    ZmitiMask
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
      this.beginTimeSearch = Date.parse(new Date(val[0])) / 1000;
      this.endTimeSearch = Date.parse(new Date(val[1])) / 1000;
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
          info: {
            inquireid: id,
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
      Vue.obserable.trigger({ type: 'toggleMask', data: true });
    },
    closeMaskPage () {//关闭侧弹框
      this.$refs['ruleForm'].resetFields();
      this.formObj.inquireid = undefined;
      Vue.obserable.trigger({ type: 'toggleMask', data: false });
    },
    adminAction (name) {//保存or 修改
      this.$refs[name].validate((valid) => {
        if (valid) {
          let action = this.formObj.inquireid ? this.inquireActions.editInquire.action : this.inquireActions.addInquire.action;
          let info = {
            productid: this.productid,
            companyid: this.company.companyid,
            inquiretitle: this.formObj.inquiretitle,
            isrealname: this.formObj.isrealname,
            abstract: this.formObj.abstract,
            begintime: new Date(this.formObj.begintime).getTime() / 1000,
            endtime: new Date(this.formObj.endtime).getTime() / 1000
          };
          if (this.formObj.inquireid) {//编辑
            info.inquireid = this.formObj.inquireid;
          }
          let s = this;
          zmitiUtil.ajax({
            remark: this.formObj.inquireid ? 'editInquire' : 'addInquire',
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
 