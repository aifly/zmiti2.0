<template>
  <div class="zmiti-meetingroom-main-ui lt-full">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>会议室设置</div>
        <div>
          <Button :loading="loading" @click="getDataList()" type="primary">刷新</Button>
          <Button type="primary" @click="add()">添加</Button>
        </div>
      </header>
      <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 130+'px' }">
        <section class="zmiti-list-where">
          <Input v-model="nameSearch" placeholder="请输入会议室名称" style="width:200px; margin-right:10px"></Input>
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
                  <Radio :label="item.value" v-for="item in layout" :key="item.value">{{item.label}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="容纳人数：" prop="peoplenumber">
                <InputNumber :min="1" v-model="formObj.peoplenumber"></InputNumber>
              </FormItem>
              <FormItem label="所属单位：" prop="companyroom">
                <Input v-model="formObj.companyroom" placeholder="所属单位"></Input>
              </FormItem>
              <FormItem label="详细地址：" prop="roomaddress">
                <Input v-model="formObj.roomaddress" placeholder="详细地址"></Input>
              </FormItem>
              <!-- <FormItem label="楼栋：" prop="building">
                <Input v-model="formObj.building" placeholder="楼栋"></Input>
              </FormItem>
              <FormItem label="楼层：" prop="floor">
                <Input v-model="formObj.floor" placeholder="楼层"></Input>
              </FormItem>
              <FormItem label="房间号：" prop="roomNum">
                <Input v-model="formObj.roomNum" placeholder="房间号"></Input>
              </FormItem>-->
              <FormItem label="设备：" prop="devices">                
                <CheckboxGroup v-model="formObj.devices">
                  <Checkbox
                    :label="item.value"
                    v-for="item in devicesData"
                    :key="item.value"
                  >{{item.label}}</Checkbox>
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
                <Switch v-model="formObj.needaudit" @on-change="change" />
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
      nameSearch: '',
      label: '',
      devicesData: [{
        value: "2",
        label: '音响'
      }, {
        value: "1",
        label: '投影'
      }],
      layout: [{
        value: "2",
        label: '会议式'
      }, {
        value: "1",
        label: '课堂式'
      }, {
        value: "0",
        label: '圆桌式'
      }],
      columns: [{
        title: "名称",
        key: 'roomname',
        align: 'center',
      }, {
        title: '布局',
        width: 200,
        key: 'layoutid',
        align: 'center',
        render: (h, params) => {
          let a = this.layout.filter(item => item.value == params.row.layoutid);
          return h('div', {}, a[0].label)
        }
      }, {
        title: "容纳人数",
        key: 'peoplenumber',
        align: 'center',
      }, {
        title: "所属单位",
        key: 'companyroom',
        align: 'center',
      }, {
        title: "详细地址",
        key: 'roomaddress',
        align: 'center',
      }, {
        title: "设备",
        key: 'devices',
        align: 'center',
        render: (h, params) => {
          let devices = [];
          params.row.devices.split(',').forEach(item => {
            devices.push(this.devicesData.filter(d=>d.value == item)[0].label);
          })
          return h('div', devices.join(','))
        }
      }, {
        title: "标签",
        key: 'roomlaber',
        align: 'center',
        render: (h, params) => {
          let label = [];
          params.row.roomlaber.split(',').forEach(item => {
            label.push(h('Tag', {
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
                  let labels = params.row.roomlaber, device = params.row.devices;
                  this.formObj = {
                    roomid: params.row.roomid,
                    roomname: params.row.roomname,
                    layoutid: params.row.layoutid,
                    roomlaber: labels.split(','),
                    needaudit: params.row.needaudit,
                    peoplenumber: params.row.peoplenumber,
                    companyroom: params.row.companyroom,
                    roomaddress: params.row.roomaddress,
                    devices: device.split(','),
                    remarks: params.row.remarks
                  }
                  Vue.obserable.trigger({
                    type: 'toggleMask',
                    data: true
                  })
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
      showDetailPage: -1,
      formObj: {
        roomid: '',
        roomname: '',//会议名称
        layoutid: '',//布局
        roomlaber: [],//标签
        needaudit: false,//会议名称
        peoplenumber: 0,//容纳人数
        companyroom: '',//所属单位
        roomaddress: '',//会议地址
        devices: [],//会议装置设备
        remarks: '',//备注
        //   building: '',//楼栋
        //   floor: '',//楼层
        //   roomNum: '',//房间号
      },
      ruleValidate: {
        roomname: [{ required: true, message: '请输入会议室名称', trigger: 'blur' }],
        companyroom: [{ required: true, message: '请输入会议室所属单位', trigger: 'blur' }],
        roomaddress: [{ required: true, message: '请输入会议室地址', trigger: 'blur' }],
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
              this.getDataList();
            }
          }
        }
      }, 200);
    },
    searchHandle () {//搜索
      this.getDataList();
    },
    getDataList () {
      this.dataSource = [{
        roomid: '1',
        roomname: '第一会议室',//会议名称
        layoutid: '1',//布局
        roomlaber: '早会,接待厅',//标签
        needaudit: false,//会议名称
        peoplenumber: 10,//容纳人数
        companyroom: '新华社',//所属单位
        roomaddress: '北京市西城区',//会议地址
        devices: '1',//会议装置设备
        remarks: '测试数据',//备注
      }, {
        roomid: '2',
        roomname: '第二会议室',//会议名称
        layoutid: '2',//布局
        roomlaber: '接待厅',//标签
        needaudit: true,//会议名称
        peoplenumber: 20,//容纳人数
        companyroom: '人民报社',//所属单位
        roomaddress: '北京市西城区',//会议地址
        devices: '1,2',//会议装置设备
        remarks: '测试数据222',//备注
      }]
      // let s = this;
      // s.loading = true;
      // let conditions = Object.assign({
      //   companyid: this.company.companyid,
      //   productid: this.productid,
      // name:this.nameSearch
      // }, this.condition)
      // zmitiUtil.ajax({
      //   remark: "getMettingroomList",
      //   data: {
      //     action: this.mettingroomActions.getMettingroomList.action,
      //     condition: conditions
      //   },
      //   error () {
      //     s.loading = false;
      //   },
      //   success (data) {
      //     s.loading = false;
      //     if (data.getret === 0) {
      //       s.total = data.total;
      //       s.dataSource = data.list;
      //     }
      //   }
      // })
    },
    change (e) {
      this.condition.page_index = e - 1;
      this.getDataList();
    },
    delete (id) {
      var s = this;
      zmitiUtil.ajax({
        remark: 'delMettingroom',
        data: {
          action: this.mettingroomActions.delMettingroom.action,
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
      Vue.obserable.trigger({ type: 'toggleMask', data: true });
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
          let action = this.formObj.roomid ? this.mettingroomActions.editMettingroom.action : this.mettingroomActions.addMettingroom.action;
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
 