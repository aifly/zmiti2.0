<template>
  <div class="zmiti-meetingroom-main-ui lt-full">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>会议室预定</div>
        <div>
          <span class="square-color">
            <i class="green"></i>可预定
          </span>
          <span class="square-color">
            <i class="gray"></i>空置
          </span>
          <span class="square-color">
            <i class="orange"></i>审核中
          </span>
          <span class="square-color">
            <i></i>已预定
          </span>
          <DatePicker
            v-model="searchDate"
            type="date"
            placeholder="请选择日期"
            @on-change="getReserveList"
          ></DatePicker>
        </div>
      </header>
      <div class="zmiti-submit-main" :style="{height:viewH - 120+'px' }">
        <div class="zmiti-room-list">
          <div class="zmiti-room-content">
            <div class="zmiti-room-body zmiti-scroll" :style="{height:viewH - 130+'px' }">
              <div class="zmiti-room-time">
                <Timeline>
                  <TimelineItem
                    color="green"
                    v-for="(time,index) in timeRange"
                    :key="index+time"
                  >{{time}}</TimelineItem>
                </Timeline>
              </div>
              <div class="zmiti-room-table" :style="{width:contentWidth+'px'}">
                <table cellspacing="0" cellpadding="0">
                  <tr class="table-title">
                    <td v-for="item in roomList" :key="item.roomid">{{item.roomname}}</td>
                  </tr>
                  <tr v-for="(item,index) in tableList" :key="index">
                    <td v-for="room in item.rooms" :key="room.roomid+'-'+item.time">
                      <div
                        v-if="room.isReserve == true && room.reserve.status == 1"
                        class="orange-td room-item"
                        @mouseover="mouseover"
                      >
                        <p>{{room.roomname}}</p>
                        <p>待审核</p>
                      </div>
                      <div
                        v-else-if="room.isReserve == true && room.reserve.status == 2"
                        class="room-item"
                        @mouseover="mouseover"
                      >
                        <p>预定人：{{room.reserve.username}}</p>
                        <p>会议人数：{{room.reserve.peoplenumber}}</p>
                      </div>
                      <div v-else :class="{'green-td': !item.isPretDate, 'gray-td': item.isPretDate,'room-item':true}" @mouseover="mouseover">
                        <p>{{item.time}}</p>
                        <p>{{item.isPretDate ? '空置':'可预定'}}</p>
                      </div>
                      <div class="room-operate" style="display:none;">
                        <div class="operate">
                          <Button
                            type="info"
                            size="small"
                            v-if="!room.isReserve"
                            @click="viewRoom(room)"
                          >查看</Button>
                          <Button
                            type="info"
                            size="small"
                            v-if="room.isReserve == true && room.reserve.status == 2"
                            @click="viewAuditRoom(room)"
                          >查看</Button>
                          <Button
                            type="info"
                            size="small"
                            v-if="room.isReserve == true && room.reserve.status == 1"
                            @click="auditRoom(room)"
                          >审核</Button>
                          <!-- <Button
                            type="info"
                            size="small"
                            v-if="room.isReserve == true"
                            @click="changeRoom(room)"
                          >更换</Button> -->
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ZmitiMask v-model="showDetail" @closeMaskPage="closeMaskPage">
      <div slot="mask-content">
        <transition name="detail">
          <section class="zmiti-add-form zmiti-scroll">
            <header class="zmiti-add-header">
              <img :src="imgs.back" alt @click="closeMaskPage" />
              <span>{{maskTitle}}</span>
            </header>
            <Form
              class="zmiti-add-form-C"
              :model="formObj"
              :label-width="90"
              v-if="maskType=='view'"
            >
              <FormItem label="名称：">
                <Input v-model="formObj.roomname" placeholder="名称" disabled></Input>
              </FormItem>
              <FormItem label="布局：">
                <RadioGroup v-model="formObj.layoutid">
                  <Radio
                    :label="item.layoutid"
                    v-for="item in layout"
                    :key="item.layoutid"
                    disabled
                  >{{item.layoutname}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="容纳人数：">
                <InputNumber :min="1" v-model="formObj.peoplenumber" disabled></InputNumber>
              </FormItem>
              <FormItem label="所属单位：">
                <Input v-model="formObj.companyroom" placeholder="所属单位" disabled></Input>
              </FormItem>
              <FormItem label="详细地址：">
                <Input v-model="formObj.roomadress" placeholder="详细地址" disabled></Input>
              </FormItem>
              <FormItem label="设备：">
                <CheckboxGroup v-model="formObj.configids">
                  <Checkbox
                    :label="item.configid"
                    v-for="item in devicesData"
                    :key="item.configid"
                    disabled
                  >{{item.configname}}</Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="标签：">
                <Tag
                  v-for="item in formObj.roomlaber"
                  :key="item"
                  :name="item"
                  color="green"
                  type="border"
                >{{ item }}</Tag>
              </FormItem>
              <FormItem label="是否需审核：">
                <Switch v-model="formObj.needaudit" :false-value="0" :true-value="1" disabled />
              </FormItem>
              <FormItem label="备注：">
                <Input
                  v-model="formObj.remarks"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  disabled
                ></Input>
              </FormItem>
            </Form>
            <Form
              class="zmiti-add-form-C"
              :model="formObj"
              :label-width="90"
              v-if="maskType=='audit' || maskType=='viewAudit'"
            >
              <FormItem label="预订会议室：">
                <Input v-model="formObj.roomname" disabled></Input>
              </FormItem>
              <FormItem label="容纳人数：">
                <InputNumber :min="1" v-model="formObj.peoplenumber" disabled></InputNumber>
              </FormItem>
              <FormItem label="会议名称：">
                <Input v-model="formObj.meetingname" disabled></Input>
              </FormItem>
              <FormItem label="预订⼈姓名：">
                <Input v-model="formObj.username" disabled></Input>
              </FormItem>
              <FormItem label="参会⼈数：">
                <InputNumber :min="1" v-model="formObj.applypeoplenumber" disabled></InputNumber>
              </FormItem>
              <Row>
                <Col span="12">
                  <FormItem label="开始时间：">
                    <Input v-model="formObj.begintime" disabled></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="结束时间：">
                    <Input v-model="formObj.endtime" disabled></Input>
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="预定时间：">
                <Input v-model="formObj.orderdate" disabled></Input>
              </FormItem>
              <FormItem label="预定说明：">
                <Input
                  v-model="formObj.applyremarks"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  disabled
                ></Input>
              </FormItem>
            </Form>
            <div class="zmiti-add-form-item zmiti-add-btns">
              <Button
                v-if="maskType=='view' || maskType=='viewAudit'"
                size="large"
                type="primary"
                @click="closeMaskPage"
              >关闭</Button>
              <Button
                v-if="maskType=='audit'"
                size="large"
                type="success"
                @click="auditAction(2)"
              >通过</Button>
              <Button v-if="maskType=='audit'" size="large" type="error" @click="auditAction(0)">拒绝</Button>
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
<style lang="scss">
.zmiti-room-list {
  .ivu-timeline-item {
    height: 61px;
  }
  .ivu-timeline-item-content {
    font-size: 14px;
    top: -1px;
    text-align: right;
    right: 25px;
    font-weight: bold;
  }
  .ivu-timeline-item-head {
    width: 20px;
    height: 20px;
    right: 0;
  }
  .ivu-timeline-item-tail {
    border-left: 2px solid #e8eaec;
    left: inherit;
    right: 10px;
  }
}
</style>
<script>
import Vue from 'vue';
import zmitiUtil from '../../../common/lib/util';
import ZmitiMask from '../../../common/mask';
import { timeRange } from '../../../common/config'

export default {
  props: ['obserable'],
  name: 'zmitiindex',
  data () {
    let currentDate = new Date();
    let year = currentDate.getFullYear(), month = currentDate.getMonth() + 1, day = currentDate.getDate();
    if (month <= 9) month = '0' + month;
    return {
      imgs: Object.freeze(window.imgs),
      viewH: window.innerHeight,
      productid: 0,
      mettingroomActions: zmitiUtil.mettingroomActions,
      company: zmitiUtil.getCurrentCompanyId(),
      searchDate: year + '-' + month + '-' + day,
      timeRange: timeRange,
      total: 0,
      loading: false,
      condition: {
        page_index: 0,
        page_size: 1000,
      },
      devicesData: [],
      layout: [],
      maskTitle: '',
      maskType: '',
      showDetail: -1,
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
        username: '',
        meetingname: '',
        applypeoplenumber: 0,
        orderdate: '',
        begintime: '',
        endtime: '',
        applyremarks: '',
      },
      roomList: [],//会议室列表
      reserveList: [],//预定列表
      tableList: [],//展示数据
    }
  },
  computed: {
    contentWidth: function () {
      let outWidth = $('.zmiti-room-body').width() - 10;
      let tableWidth = this.roomList.length * 150;
      return tableWidth < outWidth ? outWidth : tableWidth;
    }
  },
  components: {
    ZmitiMask
  },
  mounted () {
    this.init();
  },
  methods: {
    checkHover (e, target) {
      if (e.type == "mouseover") {
        return !this.contains(target, e.relatedTarget || e.fromElement) && !((e.relatedTarget || e.fromElement) === target);
      } else {
        return !this.contains(target, e.relatedTarget || e.toElement) && !((e.relatedTarget || e.toElement) === target);
      }
    },
    contains (parentNode, childNode) {
      if (parentNode.contains) {
        return parentNode != childNode && parentNode.contains(childNode);
      } else {
        return !!(parentNode.compareDocumentPosition(childNode) & 16);
      }
    },
    mouseover (e) {
      let target = e.target;
      if (e.target.nodeName == 'DIV') {
        target = e.target;
      } else if (e.target.nodeName == 'P') {
        target = e.target.parentElement;
      }
      if (this.checkHover(e, target)) {
        $('.zmiti-room-table .room-operate').css('display','none');
        target.nextElementSibling.style.display = 'block';
      }
    },
    viewRoom (room) {
      this.maskTitle = '会议室信息';
      this.maskType = 'view';
      this.formObj.roomid = room.roomid;
      this.formObj.roomname = room.roomname;
      this.formObj.layoutid = room.layoutid;
      this.formObj.roomlaber = room.roomlaber;
      this.formObj.needaudit = room.needaudit;
      this.formObj.peoplenumber = room.peoplenumber;
      this.formObj.companyroom = room.companyroom;
      this.formObj.roomadress = room.roomadress;
      this.formObj.configids = room.configids;
      this.formObj.remarks = room.remarks;
      Vue.obserable.trigger({ type: 'toggleMask', data: true });
    },
    viewAuditRoom (room) {
      this.maskTitle = '会议室预定信息';
      this.maskType = 'viewAudit';
      this.formObj.roomid = room.roomid;
      this.formObj.roomname = room.roomname;
      this.formObj.peoplenumber = room.peoplenumber;
      this.formObj.orderid = room.reserve.orderid;
      this.formObj.meetingname = room.reserve.meetingname;
      this.formObj.username = room.reserve.username;
      this.formObj.applypeoplenumber = room.reserve.peoplenumber;
      this.formObj.orderdate = this.DateFormatter(room.reserve.orderdate * 1000);
      this.formObj.begintime = this.DateFormatter(room.reserve.begintime * 1000);
      this.formObj.endtime = this.DateFormatter(room.reserve.endtime * 1000);
      this.formObj.applyremarks = room.reserve.remarks;
      this.formObj.auditStatus = room.reserve.status;
      Vue.obserable.trigger({ type: 'toggleMask', data: true });
    },
    auditRoom (room) {
      this.maskTitle = '会议室审核';
      this.maskType = 'audit';
      this.formObj.roomid = room.roomid;
      this.formObj.roomname = room.roomname;
      this.formObj.peoplenumber = room.peoplenumber;
      this.formObj.orderid = room.reserve.orderid;
      this.formObj.meetingname = room.reserve.meetingname;
      this.formObj.username = room.reserve.username;
      this.formObj.applypeoplenumber = room.reserve.peoplenumber;
      this.formObj.orderdate = this.DateFormatter(room.reserve.orderdate * 1000);
      this.formObj.begintime = this.DateFormatter(room.reserve.begintime * 1000);
      this.formObj.endtime = this.DateFormatter(room.reserve.endtime * 1000);
      this.formObj.applyremarks = room.reserve.remarks;
      Vue.obserable.trigger({ type: 'toggleMask', data: true });
    },
    changeRoom (room) {

    },
    auditAction (audit) {
      let info = {
        companyid: this.company.companyid,
        productid: this.productid,
        orderid: this.formObj.orderid,
        status: audit
      };
      let s = this;
      zmitiUtil.ajax({
        remark: 'auditMettingroom',
        data: {
          action: this.mettingroomActions.auditMettingroom.action,
          info
        },
        success (data) {
          s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
          if (data.getret === 0) {
            s.closeMaskPage();
            s.getReserveList();
          }
        }
      })
    },
    closeMaskPage () {
      Vue.obserable.trigger({
        type: 'toggleMask',
        data: false
      })
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
    getReserveList () {
      let s = this;
      s.loading = true;
      let year = this.searchDate.getFullYear(), month = this.searchDate.getMonth() + 1, day = this.searchDate.getDate();
      let conditions = Object.assign({
        companyid: this.company.companyid,
        productid: this.productid,
        status: -1,
        beginorderdate: new Date(year + '-' + month + '-' + day + ' ' + '00:00:00').getTime() / 1000,
        endorderdate: new Date(year + '-' + month + '-' + day + ' ' + '23:59:59').getTime() / 1000
      }, this.condition);
      zmitiUtil.ajax({
        remark: "getReserveMettingroomList",
        data: {
          action: this.mettingroomActions.getReserveMettingroomList.action,
          condition: conditions
        },
        error () {
          s.loading = false;
        },
        success (data) {
          s.loading = false;
          if (data.getret === 0) {
            s.reserveList = data.list;
            s.mergedTableList();
          }
        }
      })
    },
    getDataList () {
      let s = this;
      s.loading = true;
      let conditions = Object.assign({
        companyid: this.company.companyid,
        productid: this.productid,
        roomname: '',
        companyroom: '',
        roomlaber: ''
      }, this.condition);
      zmitiUtil.ajax({
        remark: "getMettingroomList",
        data: {
          action: this.mettingroomActions.getMettingroomList.action,
          condition: conditions
        },
        error () {
          s.loading = false;
        },
        success (data) {
          s.loading = false;
          if (data.getret === 0) {
            s.roomList = data.list;
            s.getReserveList();
          }
        }
      })
    },
    mergedTableList () {
      let arr = [];
      let currentDate = new Date();
      let year = this.searchDate.getFullYear(), month = this.searchDate.getMonth() + 1, day = this.searchDate.getDate();
      this.timeRange.forEach((time, index) => {
        let isPretDate = false;
        let roomTime = new Date(year + '-' + month + '-' + day + ' ' + time).getTime() / 1000;
        if(roomTime < currentDate.getTime()/1000){
          isPretDate = true;
        }
        let rooms = [];
        this.roomList.forEach(room => {
          let temp = {
            companyroom: room.companyroom,
            configids: room.configids,
            createtime: room.createtime,
            layoutid: room.layoutid,
            needaudit: room.needaudit,
            peoplenumber: room.peoplenumber,
            remarks: room.remarks,
            roomadress: room.roomadress,
            roomid: room.roomid,
            roomlaber: room.roomlaber,
            roomname: room.roomname
          };
          for (let i = 0; i < this.reserveList.length; i++) {
            let reserve = this.reserveList[i];
            if (room.roomid == reserve.roomid && reserve.begintime <= roomTime && reserve.endtime > roomTime && reserve.status != 0) {
              temp.isReserve = true;
              temp.reserve = reserve;
              console.log('reserve:',temp)
              break;
            }
          }
          rooms.push(temp);
        })
        let item = {
          time: time,
          rooms: rooms,
          isPretDate
        }
        arr.push(item);
      })
      this.tableList = arr;
    },
    DateFormatter (date) {
      let d = new Date(date);
      let year = d.getFullYear(), month = d.getMonth() + 1, day = d.getDate(), hh = d.getHours(), mm = d.getMinutes(), ss = d.getSeconds();
      if (month <= 9) month = '0' + month;
      if (hh <= 9) hh = '0' + hh;
      if (mm <= 9) mm = '0' + mm;
      if (ss <= 9) ss = '0' + ss;
      return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss;
    }

  }
}
</script>
 