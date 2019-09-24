<template>
  <div class="zmiti-duty-main-ui lt-full">
    <div class="zmiti-duty-left-table-C">
      <header class="zmiti-tab-header">
        <div>值班一览表</div>
        <div>
          <Button :loading="loading" @click="goToToday" type="primary">回到今天</Button>
          <Button :loading="loading" @click="refresh" type="primary">刷新</Button>
        </div>
      </header>
      <div class="zmiti-duty-tip">
        <span>今日值班：</span>
        白班：
        <span v-for="duty in curDayDuty" :key="duty.dutyid">{{duty.realname}}</span>
        晚班：
        <span v-for="duty in curEveningDuty" :key="duty.dutyid">{{duty.realname}}</span>
      </div>
      <div class="zmiti-duty-table">
        <header>
          <div>
            <span @click="dataChange('year','reduce')">
              <Icon type="ios-arrow-back" />
              <Icon type="ios-arrow-back" />
            </span>
            <span @click="dataChange('month','reduce')">
              <Icon type="ios-arrow-back" />
            </span>
          </div>
          <div>{{year}}年{{month}}月</div>
          <div>
            <span @click="dataChange('month','add')">
              <Icon type="ios-arrow-forward" />
            </span>
            <span @click="dataChange('year','add')">
              <Icon type="ios-arrow-forward" />
              <Icon type="ios-arrow-forward" />
            </span>
          </div>
        </header>
        <ul class="zmiti-duty-datepicker">
          <li
            class="zmiti-duty-week"
            v-for="(week) in weeks"
            :key="week"
            style="font-weight:bold;line-height:40px;height:40px;"
          >{{week}}</li>
          <template v-for="(d,i) in datePicker">
            <li
              v-if="weekIndexOfFirstDay<=i && ( i - weekIndexOfFirstDay + 1) <= monthdateCount"
              @click="getDetail(i)"
              :key="i"
              :class="{'active':i- weekIndexOfFirstDay + 1 === today && year  === currentYear &&　month === currentMonth}"
            >
              <span>{{i-weekIndexOfFirstDay+1}}</span>
              <div
                v-for="(item) in dataSource.filter((dt)=>{return (i- weekIndexOfFirstDay + 1) === new Date(dt.dutyday*1000).getDate() })"
                :key="item.dutyday"
                style="position:relative;top:2px;height:40px;overflow:hidden;"
              >
                <div class="zmiti-datepicker-detail" v-if="item.data[0].list.length>0">
                  白班：<label v-for="duty in item.data[0].list" :key="duty.dutyid">{{duty.realname}}</label>
                </div>
                <div class="zmiti-datepicker-detail" v-if="item.data[1].list.length>0">
                  晚班：<label v-for="duty in item.data[1].list" :key="duty.dutyid">{{duty.realname}}</label>
                </div>
              </div>
            </li>
            <li
              v-else
              :key="i"
              :class="{'disabled':(( i - weekIndexOfFirstDay + 1) > monthdateCount || weekIndexOfFirstDay>i)}"
            >
              <span
                v-if="weekIndexOfFirstDay>i"
              >{{(new Date(year,month-1,0).getDate()+i-weekIndexOfFirstDay+1)}}</span>
              <span v-else>{{i-weekIndexOfFirstDay+1-monthdateCount}}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="zmiti-duty-right-setting">
      <header>
        <span class="zmt_iconfont">&#xe63e;</span>
        {{year}}年{{month}}月值班详情表
      </header>
      <div class="zmiti-duty-list">
        <div v-for="item in dataSource" :key="item.dutyday" class="zmiti-duty-item">
          <div class="title">{{new Date(item.dutyday*1000).getDate()}}日</div>
          <div class="detail">
            <div>白班：</div>
            <div class="duty-person">
              <div v-for="duty in item.data[0].list" :key="duty.dutyid">
                <span>{{duty.realname}}</span>
                <span>{{duty.usermobile||''}}</span>
                <span>{{duty.departmentname}}</span>
              </div>
            </div>
          </div>
          <div class="detail">
            <div>晚班：</div>
            <div class="duty-person">
              <div v-for="duty in item.data[1].list" :key="duty.dutyid">
                <span>{{duty.realname}}</span>
                <span>{{duty.usermobile||''}}</span>
                <span>{{duty.departmentname}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ZmitiMask @closeMaskPage="closeMaskPage">
      <div slot="mask-content">
        <transition name="detail">
          <section class="zmiti-add-form zmiti-scroll">
            <header class="zmiti-add-header">
              <img :src="imgs.back" alt @click="closeMaskPage" />
              <span>{{year+'年'+month+'月'+'值班人员'}}</span>
            </header>
            <div class="zmiti-add-form-C">
              <Row class="zmiti-add-form-item">
                <Col span="24">
                  <label for="白班">白班</label>
                </Col>
              </Row>
              <template v-if="dayShift.length>0">
                <Row class="zmiti-add-form-item" v-for="(day,index) in dayShift" :key="'day'+index">
                  <Col span="20">
                    <Input
                      :value="day.realname+'('+(day.usermobile||'')+')--'+day.departmentname"
                      disabled
                    ></Input>
                  </Col>
                  <Col span="2">
                    <Icon
                      @click="deleteUser(day,index,1)"
                      type="ios-remove-circle-outline"
                      size="26"
                    />
                  </Col>
                  <Col span="2">
                    <Icon
                      v-if="dayShift.length-1 == index"
                      @click="chooseUser(1)"
                      type="ios-add-circle-outline"
                      size="26"
                    />
                  </Col>
                </Row>
              </template>
              <template v-else>
                <Row class="zmiti-add-form-item">
                  <Col span="20">
                    <Input disabled></Input>
                  </Col>
                  <Col span="2">
                    <Icon @click="chooseUser(1)" type="ios-add-circle-outline" size="26" />
                  </Col>
                  <Col span="2"></Col>
                </Row>
              </template>
              <Row class="zmiti-add-form-item">
                <Col span="24">
                  <label for="晚班">晚班</label>
                </Col>
              </Row>
              <template v-if="eveningShift.length>0">
                <Row
                  class="zmiti-add-form-item"
                  v-for="(day,index) in eveningShift"
                  :key="'evening'+index"
                >
                  <Col span="20">
                    <Input
                      :value="day.realname+'('+(day.usermobile||'')+')--'+day.departmentname"
                      disabled
                    ></Input>
                  </Col>
                  <Col span="2">
                    <Icon
                      @click="deleteUser(day,index,2)"
                      type="ios-remove-circle-outline"
                      size="26"
                    />
                  </Col>
                  <Col span="2">
                    <Icon
                      v-if="eveningShift.length-1 == index"
                      @click="chooseUser(2)"
                      type="ios-add-circle-outline"
                      size="26"
                    />
                  </Col>
                </Row>
              </template>
              <template v-else>
                <Row class="zmiti-add-form-item">
                  <Col span="20">
                    <Input disabled></Input>
                  </Col>
                  <Col span="2">
                    <Icon @click="chooseUser(2)" type="ios-add-circle-outline" size="26" />
                  </Col>
                  <Col span="2"></Col>
                </Row>
              </template>
              <div class="zmiti-add-form-item zmiti-add-btns">
                <Button size="large" type="primary" @click="saveDuty">保存</Button>
              </div>
            </div>
          </section>
        </transition>
      </div>
    </ZmitiMask>
    <Modal title="选择员工" v-model="visiable" @on-ok="addUser" width="800" :loading="loadingModal">
      <div class="zmiti-department-usermodal">
        <div class="zmiti-department-left">
          <Tree :data="departmentTree" ref="departmentTree" @on-select-change="departmentChange"></Tree>
        </div>
        <div class="zmiti-department-right">
          <ZmitiTable
            :height="342"
            ref="userTable"
            :loading="userLoading"
            :dataSource="userData"
            :columns="userColumns"
            :change="change"
            @getSelection="getSelection"
            :current="userCondition.page_index+1"
            :page-size="userCondition.page_size"
            :total="userTotal"
          ></ZmitiTable>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.zmiti-department-usermodal {
  height: 400px;
  .zmiti-department-left {
    float: left;
    width: 200px;
    height: 100%;
    overflow: auto;
    padding-right: 10px;
  }
  .zmiti-department-right {
    float: left;
    height: 100%;
    width: 568px;
    overflow: auto;
  }
}
</style>
<script>
import Vue from 'vue';
import zmitiUtil from '../../../common/lib/util';
import ZmitiMask from '../../../common/mask';
import ZmitiTable from '../../../common/table';
var { dutyActions, departmentAction, userActions, formatDate } = zmitiUtil;
let company = zmitiUtil.getCurrentCompanyId();
export default {
  props: ['obserable'],
  name: 'dutyindex',
  data () {
    return {
      curNode: {},
      departmentTree: [
        {
          title: company.companyname,
          expand: true,
          render: (h, { root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-block',
                fontSize: '14px',
                cursor: 'pointer'
              }
            }, [
              h('span', {
                class: ['ivu-tree-title', 'company-hone'],
                on: {
                  click: (e) => {
                    $('.ivu-tree-title').removeClass('ivu-tree-title-selected');
                    $('.company-hone').addClass('ivu-tree-title-selected');
                    this.curNode = company;
                    this.getDepartmentUserData();
                  }
                }
              }, [
                h('Icon', {
                  props: {
                    type: 'ios-home',
                    color: '#2d8cf0',
                    size: '20'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)
              ])
            ]);
          },
          children: []
        }
      ],
      userColumns: [{
        title: "姓名",
        key: 'realname',
        align: 'center',
        width: 80,
      }, {
        title: "职务",
        width: 100,
        key: 'realname',
        align: 'center',
      }, {
        title: "部门",
        key: 'departments',
        align: 'center',
        render: (h, params) => {
          let departments = [];
          params.row.departments.forEach(item => {
            departments.push(item.departmentname)
          })
          return h('div', {}, departments.join(','));
        },
      }, {
        title: "办公电话",
        key: 'jobphonenum',
        align: 'center',
      }, {
        title: "手机",
        key: 'usermobile',
        align: 'center',
      }, {
        title: "邮箱",
        key: 'useremail',
        align: 'center',
      }],
      visiable: false,
      productid: 0,
      datePicker: new Array(42),
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      loading: false,
      monthdateCount: 30,
      year: 2019,
      month: 7,
      today: 0,
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      imgs: window.imgs,
      dataSource: [],
      currentWeekIndex: -1,
      weekIndexOfFirstDay: 0,//获取月份第一天的是周几
      condition: {
        page_index: 0,
        page_size: 1000,
      },
      loadingModal: true,
      userData: [],
      userTotal: 0,
      userLoading: false,
      userCondition: {
        page_index: 0,
        page_size: 10,
      },
      curEveningDuty: [],
      curDayDuty: [],
      userSelectList: [],
      addType: 1,
      dayShift: [],
      eveningShift: [],
      clickDay:0,
    }
  },
  components: {
    ZmitiMask,
    ZmitiTable
  },
  mounted () {
    this.goToToday();
    this.today = new Date().getDate();
  },
  methods: {
    goToToday () {
      this.setMonth(new Date().getFullYear(), new Date().getMonth() + 1);
      this.refresh()
    },
    refresh () {
      this.init(() => {
        this.monthdateCount = this.getDateByMonth();
        this.currentWeekIndex = this.getCurrentWeekIndex();
        this.weekIndexOfFirstDay = this.getCurrentWeekIndex(1);//获取月份第一天是周几
        this.getDataList();
      })
    },
    init (fn) {
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
              fn && fn(this.productid)
            }
          }
        }
      }, 100);
    },
    getDataList () {
      var s = this;
      var { condition, year, month } = this;
      let param = Object.assign({
        companyid: company.companyid,
        productid: this.productid,
        dutyday: year + '-' + month + '-' + '1',
        dutydayend: year + '-' + month + '-' + (new Date(year, month, 0).getDate())
      }, condition);
      s.loading = true;
      zmitiUtil.ajax({
        remark: "getDutyList",
        data: {
          action: dutyActions.getDutyList.action,
          condition: param
        },
        error () {
          s.loading = false;
        },
        success (data) {
          s.loading = false;
          if (data.getret === 0) {
            s.formatDutyData(data.list);
            //  s.dataSource = data.list;
          }
        }
      })
    },
    formatDutyData (data) {
      let times = [], dataList = [];
      data.forEach(item => {
        let index = times.indexOf(item.dutyday);
        if (index == -1) {
          index = dataList.length;
          times.push(item.dutyday);
          dataList.push({
            dutyday: item.dutyday,
            data: [{
              dutytype: 1,
              list: []
            }, {
              dutytype: 2,
              list: []
            }]
          })
        }
        let temp = {
          departmentid: item.departmentid,
          departmentname: item.departmentname,
          dutyday: this.formatDate(item.dutyday * 1000),
          dutyid: item.dutyid,
          dutytype: item.dutytype,
          dutytypename: item.dutyday == 1 ? '白班' : '晚班',
          status: item.status,
          userid: item.userid,
          username: item.username,
          realname: item.username,
          usermobile:item.usermobile
        }
        if (item.dutytype == 1) {
          dataList[index].data[0].list.push(temp)
        } else {
          dataList[index].data[1].list.push(temp)
        }
      })
      dataList.sort((a,b)=>{
        if (a.dutyday < b.dutyday ) {
          return -1;
        }
        if (a.dutyday > b.dutyday ) {
          return 1;
        }
        return 0;
      });
      if (this.curDayDuty.length <= 0 && this.curEveningDuty.length <= 0) {
        let curDate = new Date();
        dataList.forEach(d => {
          if (d.dutyday == new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()).getTime() / 1000) {
            d.data.forEach(duty => {
              if (duty.dutytype == 1) {
                this.curDayDuty = duty.list;
              } else {
                this.curEveningDuty = duty.list;
              }
            })
          }
        })
      }
      this.dataSource = dataList;
      console.log(dataList)
    },
    getDetail (i) {
      this.clickDay = i - this.weekIndexOfFirstDay + 1;
      let dutyDate = this.dataSource.filter((dt) => { return this.clickDay === new Date(dt.dutyday * 1000).getDate(); })
      this.dayShift = [];
      this.eveningShift = [];
      dutyDate.length > 0 && dutyDate[0].data.forEach(duty => {
        if (duty.dutytype == 1) {
          duty.list.forEach(item => {
            this.dayShift.push(item);
          })
        } else {
          duty.list.forEach(item => {
            this.eveningShift.push(item);
          })
        }
      })
      Vue.obserable.trigger({
        type: "toggleMask",
        data: true
      });
    },
    addUser () {
      var s = this;
      if (this.userSelectList.length <= 0) {
        this.loadingModal = false;
        this.$Message.warning('请选中要添加的用户');
        return;
      }
      var s = this;
      this.userSelectList.forEach(item => {
        let user = {
          usermobile: item.usermobile,
          userid: item.userid,
          realname: item.realname,
          username: item.username
        };
        if (this.curNode.departmentid) {
          user.departmentid = this.curNode.departmentid;
          user.departmentname = this.curNode.departmentname;
        } else {
          if (item.departments.length > 0) {
            user.departmentid = item.departments[0].departmentid;
            user.departmentname = item.departments[0].departmentname;
          } else {
            user.departmentid = 0;
            user.departmentname = '';
          }
        }
        if (this.addType == 1) {
          this.dayShift.push(user);
        } else {
          this.eveningShift.push(user);
        }
      })
      this.visiable = false;
    },
    deleteUser (user, index, type) {
      console.log(user)
      if (user.dutyid) {
        var s = this;
        zmitiUtil.ajax({
          remark: 'delDuty',
          data: {
            action: dutyActions.delDuty.action,
            condition: {
              companyid: company.companyid,
              productid: this.productid,
              dutyids: [user.dutyid]
            }
          },
          success (data) {
            if (data.getret === 0) {
              if (type == 1) {
                s.dayShift.splice(index, 1);
              } else {
                s.eveningShift.splice(index, 1);
              }
              s.getDataList();
            } else {
              s.$Message['error'](data.msg || data.getmsg);
            }
          }
        })
      } else {
        if (type == 1) {
          this.dayShift.splice(index, 1);
        } else {
          this.eveningShift.splice(index, 1);
        }
      }
    },
    chooseUser (type) {
      this.visiable = true;
      this.addType = type;
      console.log(type);
      this.userSelectList = [];
      this.$refs['userTable'].selectAll(false);
      if (this.departmentTree[0].children.length <= 0) {
        this.getDepartmentData();
      }
    },
    saveDuty () {

      console.log(this.dayShift)
      console.log(this.eveningShift)
      let addDayShift = this.dayShift.filter(item => { return !item.dutyid });
      let addEveningShift = this.eveningShift.filter(item => { return !item.dutyid });

      console.log(addDayShift)
      console.log(addEveningShift)

      let dutydata = [];
      addDayShift.forEach(item => {
        dutydata.push({
          userid: item.userid,
          username: item.realname,
          dutyday: this.year + '-' + this.month + '-' + this.clickDay,
          dutytype: "1",
          departmentid: item.departmentid,
          departmentname: item.departmentname
        })
      })
      addEveningShift.forEach(item => {
        dutydata.push({
          userid: item.userid,
          username: item.realname,
          dutyday: this.year + '-' + this.month + '-' + this.clickDay,
          dutytype: "2",
          departmentid: item.departmentid,
          departmentname: item.departmentname
        })
      })
      let info = {
        companyid: company.companyid,
        productid: this.productid,
        dutydata
      };
      let s = this;
      zmitiUtil.ajax({
        remark: 'addDuty',
        data: {
          action: dutyActions.addDuty.action,
          info
        },
        success (data) {
          if (data.getret === 0) {
            s.closeMaskPage();
            s.getDataList();
          } else {
            s.$Message['error'](data.msg || data.getmsg);
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
    getDepartmentData () {
      let s = this;
      let conditions = {
        companyid: company.companyid,
        fatherid: 0,
        status: 1,
        page_index: 0,
        page_size: 1000
      };
      zmitiUtil.ajax({
        remark: "getDepartmentList",
        data: {
          action: departmentAction.getDepartmentList.action,
          condition: conditions
        },
        success (data) {
          s.loading = false;
          if (data.getret === 0) {
            let children = [], selectNode = undefined;
            data.list.forEach((d, index) => {
              let select = index == 0 ? true : false;
              let item = {
                title: d.departmentname,
                departmentid: d.departmentid,
                departmentname: d.departmentname,
                fatherid: d.fatherid,
                status: d.status,
                selected: select
              };
              children.push(item);
              select && (selectNode = item);
            })
            s.departmentTree[0].children = children;
            s.curNode = selectNode;
            s.getDepartmentUserData();
          }
        }
      })
    },
    departmentChange (selectNodes, node) {
      if (this.curNode.departmentid == node.departmentid) {
        node.selected = true;
      } else {
        $('.company-hone').removeClass('ivu-tree-title-selected');
        this.curNode = node;
        this.getDepartmentUserData();
        console.log(node);
      }
    },
    getSelection (val) {
      console.log(val)
      this.userSelectList = val;
    },
    change (e) {
      this.userCondition.page_index = e - 1;
      this.getDepartmentUserData();
    },
    getDepartmentUserData () {
      let s = this;
      let action = this.curNode.departmentid ? departmentAction.getDepartmentUserList.action : departmentAction.getCompanyUserList.action
      let conditions = Object.assign({
        companyid: company.companyid,
        departmentid: this.curNode.departmentid
      }, this.userCondition);
      s.userLoading = true;
      s.userData = [];
      s.userTotal = 0;
      zmitiUtil.ajax({
        remark: this.curNode.departmentid ? "getDepartmentUserList" : "getCompanyUserList",
        data: {
          action: action,
          condition: conditions
        },
        success (data) {
          s.userLoading = false;
          if (data.getret === 0) {
            s.userData = data.list;
            s.userTotal = data.total;
          } else {
            s.$Message['error'](data.msg || data.getmsg);
          }
        }
      })
    },
    dataChange (type, operator) {
      if (type === 'month') {
        if (operator === 'add') {
          this.month++;
          if (this.month > 12) {
            this.month = 1;
          }
        } else {
          this.month--;
          if (this.month < 1) {
            this.month = 12;
          }
        }
      }
      else {
        if (operator === 'add') {
          this.year++;

        } else {
          this.year--;
        }
      }
      this.setMonth(this.year, this.month);
      this.monthdateCount = this.getDateByMonth();
      this.currentWeekIndex = this.getCurrentWeekIndex();
      this.weekIndexOfFirstDay = this.getCurrentWeekIndex(1);//获取月份第一天是周几
      this.getDataList();

    },
    setMonth (year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
      this.year = year;
      this.month = month;
    },
    getCurrentWeekIndex (date) {
      var { year, month } = this;
      var d = new Date(year, month, 0);
      if (date) {
        d.setYear(year);
        d.setMonth(month - 1);
        d.setDate(1);
        d.setDate(date);
      }
      return d.getDay();
    },
    getDateByMonth () {
      var { year, month } = this;
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    formatDate (date, format) {
      if (!date) return;
      if (!format)
        format = "yyyy-MM-dd H:mm:ss";
      switch (typeof date) {
        case "string":
          date = new Date(date.replace(/-/, "/"));
          break;
        case "number":
          date = new Date(date);
          break;
      }
      if (!date instanceof Date) return;
      var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
      };
      return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
      });
    }
  }
}
</script>
 