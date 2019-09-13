<template>
  <div class="zmiti-meetingroom-main-ui lt-full">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>会议室设置</div>
        <div>
          <Button :loading="loading" @click="getDataList()" type="primary">刷新</Button>
          <Button type="primary" @click="add()">添加</Button>
          <Button type="primary" @click="deletes()">删除</Button>
        </div>
      </header>
      <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 130+'px' }">
        <section class="zmiti-list-where">
          <Input v-model="searchForm.roomname" placeholder="请输入会议室名称"></Input>
          <Input v-model="searchForm.companyroom" placeholder="请输入所属单位"></Input>
          <Input v-model="searchForm.roomlaber" placeholder="请输入会议室标签"></Input>
          <Button icon="md-search" @click="searchHandle">搜索</Button>
        </section>
        <ZmitiTable
          :loading="loading"
          :dataSource="dataSource"
          :columns="columns"
          :change="change"
          @getSelection="getSelection"
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
              <span>会议室信息</span>
            </header>
            <Form
              class="zmiti-add-form-C"
              :model="formObj"
              :rules="ruleValidate"
              :label-width="90"
              ref="ruleForm"
            >
              <input v-model="formObj.roomid" type="hidden" />
              <FormItem label="名称：" prop="roomname">
                <Input v-model="formObj.roomname" placeholder="名称"></Input>
              </FormItem>
              <FormItem label="布局：" prop="layoutid">
                <RadioGroup v-model="formObj.layoutid">
                  <Radio
                    :label="item.layoutid"
                    v-for="item in layout"
                    :key="item.layoutid"
                  >{{item.layoutname}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="容纳人数：" prop="peoplenumber">
                <InputNumber :min="1" v-model="formObj.peoplenumber"></InputNumber>
              </FormItem>
              <FormItem label="所属单位：" prop="companyroom">
                <Input v-model="formObj.companyroom" placeholder="所属单位"></Input>
              </FormItem>
              <FormItem label="详细地址：" prop="roomadress">
                <Input v-model="formObj.roomadress" placeholder="详细地址"></Input>
              </FormItem>
              <FormItem label="设备：" prop="configids">
                <CheckboxGroup v-model="formObj.configids">
                  <Checkbox
                    :label="item.configid"
                    v-for="item in devicesData"
                    :key="item.configid"
                  >{{item.configname}}</Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="标签：">
                <Tag
                  v-for="item in formObj.roomlaber"
                  :key="item"
                  :name="item"
                  closable
                  color="green"
                  type="border"
                  @on-close="handleCloseLaber"
                >{{ item }}</Tag>
                <Input v-model="label" size="small" placeholder="输入标签" style="width:80px"></Input>
                <Button icon="ios-add" type="dashed" size="small" @click="handleAddLaber">添加标签</Button>
              </FormItem>
              <FormItem label="是否需审核：" prop="needaudit">
                <Switch v-model="formObj.needaudit" :false-value="0" :true-value="1" />
              </FormItem>
              <FormItem label="备注：" prop="remarks">
                <Input
                  v-model="formObj.remarks"
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
import ZmitiMask from '../../../common/mask';
import ZmitiTable from '../../../common/table';
export default {
  props: ['obserable'],
  name: 'meetingroomsetting',
  data () {
    return {
      imgs: window.imgs,
      mettingroomActions: zmitiUtil.mettingroomActions,
      company: zmitiUtil.getCurrentCompanyId(),
      total: 0,
      loading: false,
      viewH: window.innerHeight,
      productid: 0,
      selectList: [],
      searchForm: {
        roomname: '',
        companyroom: '',
        roomlaber: ''
      },
      label: '',
      devicesData: [],
      layout: [],
      columns: [{
        title: "名称",
        key: 'roomname',
        align: 'center',
      }, {
        title: '布局',
        width: 100,
        key: 'layoutid',
        align: 'center',
        render: (h, params) => {
          let a = this.layout.filter(item => item.layoutid == params.row.layoutid);
          return h('div', {}, a[0].layoutname)
        }
      }, {
        title: "容纳人数",
        width: 100,
        key: 'peoplenumber',
        align: 'center',
      }, {
        title: "所属单位",
        key: 'companyroom',
        align: 'center',
      }, {
        title: "详细地址",
        key: 'roomadress',
        align: 'center',
      }, {
        title: "设备",
        width: 200,
        key: 'configids',
        align: 'center',
        render: (h, params) => {
          let configids = [];
          params.row.configids.forEach(item => {
            configids.push(this.devicesData.filter(d => d.configid == item)[0].configname);
          })
          return h('div', configids.join(','))
        }
      }, {
        title: "标签",
        width: 200,
        key: 'roomlaber',
        align: 'center',
        render: (h, params) => {
          let label = [];
          params.row.roomlaber.forEach(item => {
            item != '' && label.push(h('Tag', {
              props: {
                color: 'green',
                type: 'border'
              }
            }, item));
          })
          return h('div', label)
        }
      }, {
        title: "是否需审核",
        width: 120,
        key: 'needaudit',
        align: 'center',
        render: (h, params) => {
          return h('div', {}, params.row.needaudit ? '是' : '否')
        }
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        width: 200,
        render: (h, params) => {
          return h('div', [
            h('span', {
              style: {
                cursor: 'pointer',
                color: "rgb(0, 102, 204)"                
              },
              on: {
                click: () => {
                  console.log(params.row)
                  let labels = params.row.roomlaber, device = params.row.configids;
                  this.formObj = {
                    roomid: params.row.roomid,
                    roomname: params.row.roomname,
                    layoutid: params.row.layoutid,
                    roomlaber: params.row.roomlaber,
                    needaudit: params.row.needaudit,
                    peoplenumber: params.row.peoplenumber,
                    companyroom: params.row.companyroom,
                    roomadress: params.row.roomadress,
                    configids: params.row.configids,
                    remarks: params.row.remarks
                  }
                  Vue.obserable.trigger({
                    type: 'toggleMask',
                    data: true
                  })
                }
              }
            }, '编辑'),
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
      showDetailPage: -1,
      formObj: {
        roomid: undefined,
        roomname: '',//会议名称
        layoutid: '',//布局
        roomlaber: [],//标签
        needaudit: 0,//会议名称
        peoplenumber: 0,//容纳人数
        companyroom: '',//所属单位
        roomadress: '',//会议地址
        configids: [],//会议装置设备
        remarks: '',//备注
      },
      ruleValidate: {
        roomname: [{ required: true, message: '请输入会议室名称', trigger: 'blur' }],
        companyroom: [{ required: true, message: '请输入会议室所属单位', trigger: 'blur' }],
        roomadress: [{ required: true, message: '请输入会议室地址', trigger: 'blur' }],
      },
    }
  },
  components: {
    ZmitiMask,
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
              this.getDeviceList();
              this.getLayoutList();
              this.getDataList();
            }
          }
        }
      }, 200);
    },
    getDeviceList () {
      let s = this;
      let conditions = {
        companyid: this.company.companyid,
        productid: this.productid,
        page_index: 0,
        page_size: 100
      };
      zmitiUtil.ajax({
        remark: "getDeviceList",
        data: {
          action: this.mettingroomActions.getDeviceList.action,
          condition: conditions
        },
        success (data) {
          if (data.getret === 0) {
            s.devicesData = data.list;
          }
        }
      })
    },
    getLayoutList () {
      let s = this;
      let conditions = {
        companyid: this.company.companyid,
        productid: this.productid,
        page_index: 0,
        page_size: 100
      };
      zmitiUtil.ajax({
        remark: "getLayoutList",
        data: {
          action: this.mettingroomActions.getLayoutList.action,
          condition: conditions
        },
        success (data) {
          if (data.getret === 0) {
            s.layout = data.list;
          }
        }
      })
    },
    searchHandle () {//搜索
      this.getDataList();
    },
    getSelection (val) {
      console.log(val)
    },
    getDataList () {
      let s = this;
      s.loading = true;
      let conditions = Object.assign({
        companyid: this.company.companyid,
        productid: this.productid
      }, this.condition, this.searchForm);
      zmitiUtil.ajax({
        remark: "getMettingroomList",
        data: {
          action: this.mettingroomActions.getMettingroomList.action,
          condition: conditions,
          list: []
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
    deletes () {//获选删除

    },
    delete (id) {
      this.goDelete([id]);
    },
    goDelete (ids) {
      var s = this;
      zmitiUtil.ajax({
        remark: 'delMettingroom',
        data: {
          action: this.mettingroomActions.delMettingroom.action,
          info: {
            companyid: this.company.companyid,
            productid: this.productid
          },
          list: ids
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
      this.formObj.configids = [];
      this.formObj.roomlaber = [];
      this.formObj.roomid = undefined;
      Vue.obserable.trigger({ type: 'toggleMask', data: false });
    },
    adminAction (name) {//保存or 修改
      console.log(this.formObj)
      this.$refs[name].validate((valid) => {
        if (valid) {
          let action = this.formObj.roomid ? this.mettingroomActions.editMettingroom.action : this.mettingroomActions.addMettingroom.action;
          let info = Object.assign({
            companyid: this.company.companyid,
            productid: this.productid
          }, this.formObj);
          let s = this;
          zmitiUtil.ajax({
            remark: this.formObj.roomid ? 'editMettingroom' : 'addMettingroom',
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
    handleAddLaber () {
      if (this.label != "") {
        this.formObj.roomlaber.push(this.label);
        this.label = '';
      } else {
        this.$Message.warning('请输入标签');
      }
    },
    handleCloseLaber (event, name) {
      const index = this.formObj.roomlaber.indexOf(name);
      this.formObj.roomlaber.splice(index, 1);
    }
  }
}
</script>
 