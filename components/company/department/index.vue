<template>
  <div>
    <div class="zmiti-department-main-ui lt-full">
      <div class="zmiti-department-left">
        <div class="zmiti-company">
          <div :class="{'active':(curNode.companyname == companyname)}" @click="departmentClick(0)">{{companyname}}</div>
          <div><Button type="primary" size="small" @click="showDepartment(0)">新增部门</Button></div>
        </div>
        <div class="zmiti-department-list">
          <ul>
            <li class="department-item" v-for="depart in departmentData" :key="depart.departmentid">
              <div :class="{'active':(curNode.departmentid == depart.departmentid)}" @click="departmentClick(1,depart)">{{depart.departmentname}}</div>
              <div>
                <!-- <Icon type="edit" color="#00c1de" size="20"></Icon>
                <Icon type="android-delete" color="#00c1de" size="20"></Icon> -->
                <Button type="dashed" size="small" @click="showDepartment(1,depart)">修改</Button>
                <Button type="dashed" size="small" @click="delDepartment(depart)">删除</Button>
              </div>
            </li>
          </ul>
        </div>
        <!-- <Tree :data="departmentTree" ref="departmentTree" @on-select-change="departmentChange"></Tree> -->
      </div>
      <div class="zmiti-department-right">
        <header class="zmiti-department-header">
          <div>{{curNode.title || curNode.companyname}}</div>
          <!-- <div>
            <Button type="primary" @click="showDepartment(0)">新增部门</Button>
            <Button type="primary" v-show="curNode.title" @click="showDepartment(1)">修改部门</Button>
            <Button type="primary" v-show="curNode.title" @click="delDepartment">删除部门</Button>
          </div> -->
        </header>
        <div class="zmiti-department-main zmiti-scroll" :style="{height:viewH - 140+'px' }">
          <section class="zmiti-list-where">
            <!-- <Input placeholder="搜索成员、部门"></Input>
            <Button icon="md-search">搜索</Button>-->
          </section>
          <ZmitiTable
            ref="mainTable"
            :loading="loading"
            :dataSource="dataSource"
            :columns="columns"
            :change="change"
            @getSelection="getSelection"
            :current="condition.page_index+1"
            :page-size="condition.page_size"
            :total="total"
          >
            <template #table-btns>
              <Button v-if="curNode.departmentid" @click="chooseUser">新增</Button>
              <Button @click="showDepartmentModal">设置部门</Button>
              <Button v-if="curNode.departmentid" @click="delUser">删除</Button>
            </template>
          </ZmitiTable>
        </div>
      </div>
    </div>
    <ZmitiMask v-model="showDetailPage" @closeMaskPage="closeMaskPage">
      <div slot="mask-content">
        <transition name="detail">
          <section class="zmiti-add-form zmiti-scroll">
            <header class="zmiti-add-header">
              <img :src="imgs.back" alt @click="closeMaskPage" />
              <span>部门信息</span>
            </header>
            <div class="zmiti-add-form-item zmiti-add-btns">
              <Form
                class="zmiti-add-form-C"
                :model="formObj"
                :rules="ruleValidate"
                :label-width="90"
                ref="ruleForm"
              >
                <FormItem label prop="departmentid">
                  <input v-model="formObj.departmentid" type="hidden" />
                </FormItem>
                <FormItem label="部门名称：" prop="departmentname">
                  <Input v-model="formObj.departmentname" placeholder="部门名称"></Input>
                </FormItem>
              </Form>
              <Button
                size="large"
                :disabled="saveDisabled"
                type="primary"
                @click="adminAction('ruleForm')"
              >保存</Button>
            </div>
          </section>
        </transition>
      </div>
    </ZmitiMask>
    <Modal title="选择用户" width="800" v-model="visiable" @on-ok="addUser" :loading="loadingModal" :mask-closable="false">
      <div>
        <ZmitiTable
          :height="300"
          ref="userTable"
          :loading="userLoading"
          :dataSource="userData"
          :columns="columns"
          :change="userChange"
          :page-size="userCondition.page_size"
          :total="userTotal"
          @getSelection="getUserSelection"
        ></ZmitiTable>
      </div>
    </Modal>
    <Modal title="设置部门" width="550" v-model="departmentVisiable" @on-cancel="closeDepartmentModal" :mask-closable="false" :footer-hide="true">
      <div style="border: 1px solid #ccc;display: flex;">
        <div style="border-right:1px solid #ccc;padding:10px 10px 10px 0;flex:1;height:400px;overflow:auto;">
          <Tree :data="departmentData" @on-check-change="userDepartmentChange" show-checkbox :multiple="true" :check-strictly="true" :check-directly="true"></Tree>
        </div>
        <div style="flex:1;">
          <div style="padding:10px;height:40px;border-bottom:1px solid #ccc;font-size:15px;">用户所在部门</div>
          <ul style="padding:10px;font-size:14px;">
            <li v-for="depart in selectDepartment" :key="depart.departmentid+'user'" style="line-height:30px;">
              {{depart.departmentname}}
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.ivu-tree ul {
  font-size: 14px;
}
</style>
<script>
import Vue from 'vue';
import zmitiUtil from '../../../common/lib/util';
import ZmitiMask from '../../../common/mask';
import ZmitiTable from '../../../common/table';
let { departmentAction, userActions, formatDate } = zmitiUtil;
let company = zmitiUtil.getCurrentCompanyId();
export default {
  data () {
    return {
      companyname:company.companyname,
      visiable: false,
      departmentVisiable:false,
      departmentData:[],
      selectDepartment:[],
      saveDisabled: false,
      userLoading: false,
      userData: [],
      userSelectList: [],
      loadingModal: true,
      userCondition: {
        page_index: 0,
        page_size: 10,
      },
      userTotal: 0,
      imgs: window.imgs,
      showDetailPage: -1,
      curNode: {},
      dataSource: [],
      total: 0,
      loading: false,
      viewH: window.innerHeight,
      formObj: {
        departmentname: '',
        departmentid: undefined
      },
      ruleValidate: {
        departmentname: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
      },
      selectList: [],
      condition: {
        page_index: 0,
        page_size: 10,
      },
      columns: [{
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
          console.log(params.row)
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
      // departmentTree: [
      //   {
      //     title: company.companyname,
      //     expand: true,
      //     render: (h, { root, node, data }) => {
      //       return h('span', {
      //         style: {
      //           display: 'inline-block',
      //           fontSize: '14px',
      //           cursor: 'pointer'
      //         }
      //       }, [
      //         h('span', {
      //           class: ['ivu-tree-title', 'company-hone'],
      //           on: {
      //             click: (e) => {
      //               $('.ivu-tree-title').removeClass('ivu-tree-title-selected');
      //               $('.company-hone').addClass('ivu-tree-title-selected');
      //               this.curNode = company;
      //               this.getDepartmentUserData();
      //             }
      //           }
      //         }, [
      //           h('Icon', {
      //             props: {
      //               type: 'ios-home',
      //               color: '#2d8cf0',
      //               size: '20'
      //             },
      //             style: {
      //               marginRight: '8px'
      //             }
      //           }),
      //           h('span', data.title)
      //         ])
      //       ]);
      //     },
      //     children: []
      //   }
      // ]
    }
  },
  components: {
    ZmitiMask,
    ZmitiTable,
  },
  mounted () {
    this.getDepartmentData();
  },
  methods: {
    getSelection (val) {
      console.log(val)
      this.selectList = val;
    },
    getUserSelection (val) {
      this.userSelectList = val;
    },
    departmentClick(type,node){
      this.$refs['mainTable'].selectAll(false);
      if (type == 1 && this.curNode.departmentid != node.departmentid) {        
        this.curNode = node;
        this.condition.page_index = 0;
        this.getDepartmentUserData();
        console.log(node);
      }else if(type == 0){
        this.curNode = company;
        this.condition.page_index = 0;
        this.getDepartmentUserData();
      }
    },
    departmentChange (selectNodes, node) {
      this.$refs['mainTable'].selectAll(false);
      if (this.curNode.departmentid == node.departmentid) {
        node.selected = true;
      } else {
        $('.company-hone').removeClass('ivu-tree-title-selected');
        this.curNode = node;
        this.getDepartmentUserData();
        console.log(node);
      }
    },
    userDepartmentChange(selectNodes, node){
      console.log(selectNodes, node)
      var s = this;
      if(node.checked == true){
        zmitiUtil.ajax({
          remark: 'addDepartmentUser',
          data: {
            action: departmentAction.addDepartmentUser.action,
            info: {
              companyid: company.companyid,
              departmentid: node.departmentid,
              userids: this.selectList[0].userid+""
            },
          },
          success (data) {
            if (data.getret === 0) {
              s.selectDepartment = selectNodes;
            }else{
              node.checked = false;
              s.$Message.error('添加用户部门失败')
            }
          }
        })
      }else{        
        zmitiUtil.ajax({
          remark: 'delDepartmentUser',
          data: {
            action: departmentAction.delDepartmentUser.action,
            condition: {
              companyid: company.companyid,
              departmentid: node.departmentid,
              userids: this.selectList[0].userid+""
            },
          },
          success (data) {
            if (data.getret === 0) {
              s.selectDepartment = selectNodes;
            }else{
              node.checked = true;
              s.$Message.error('删除用户部门失败')
            }
          }
        })
      }
    },
    showDepartment (type,depart) {//弹出侧弹框
      Vue.obserable.trigger({ type: 'toggleMask', data: true });
      if (type == 1) {
        this.formObj = {
          departmentid: depart.departmentid,
          departmentname: depart.title
        }
      }
    },
    showDepartmentModal(){
      if (this.selectList.length == 1) {
        this.selectDepartment = [];
        let departIds = [];
        this.selectList[0].departments.forEach(item=>{
          departIds.push(item.departmentid);
        })
        this.departmentData.forEach(item=>{
          item.checked = false;
          if(departIds.includes(item.departmentid)){
            item.checked = true;
            this.selectDepartment.push(item);
          }
        })        
        this.departmentVisiable = true;
      } else {
        this.$Message.warning('请选择一个用户设置部门');
      }
    },
    closeDepartmentModal(){
      this.getDepartmentUserData();
    },
    delDepartment (depart) {
      if (depart.departmentid) {
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认要删除<span style="color:red;"> ' + depart.title + ' </span>吗？</p>',
          onOk: () => {
            var s = this;
            zmitiUtil.ajax({
              remark: 'delDepartment',
              data: {
                action: departmentAction.delDepartment.action,
                info: {
                  companyid: company.companyid,
                  departmentids: depart.departmentid.toString()
                },
              },
              success (data) {
                s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
                if (data.getret === 0) {
                  s.getDepartmentData();
                }
              }
            })
          },
          onCancel: () => {

          }
        });

      } else {
        this.$Message.warning('请选中要删除的部门');
      }
    },
    getAllUser () {
      var s = this;
      this.userLoading = true;
      let conditions = Object.assign({
        companyid: company.companyid
      }, this.userCondition);
      s.userData = [];
      s.userTotal = 0;
      zmitiUtil.ajax({
        remark: "getCompanyUserList",
        data: {
          action: departmentAction.getCompanyUserList.action,
          condition: conditions
        },
        error () {
          s.userLoading = false;
        },
        success (data) {
          s.userLoading = false;
          if (data.getret === 0) {
            s.userTotal = data.total;
            s.userData = data.list;
          }
        }
      })
    },
    chooseUser () {
      this.visiable = true;
      this.userSelectList = [];
      this.$refs['userTable'].selectAll(false);
      if (this.userData.length <= 0) {
        this.getAllUser();
      }
    },
    addUser () {
      if (this.userSelectList.length <= 0) {
        this.loadingModal = false;
        this.$Message.warning('请选中要添加的用户');
        return;
      }
      var s = this;
      let ids = [];
      this.userSelectList.forEach(item => {
        console.log(item.departments)
        if (item.departments.length > 0) {
          let flag = true;
          item.departments.forEach(depart=>{
            if (item.departmentid == this.curNode.departmentid) {
              flag = false;
            }
          })          
          flag && ids.push(item.userid);
        } else {
          ids.push(item.userid);
        }
      })
      zmitiUtil.ajax({
        remark: 'addDepartmentUser',
        data: {
          action: departmentAction.addDepartmentUser.action,
          info: {
            companyid: company.companyid,
            departmentid: this.curNode.departmentid,
            userids: ids.join(',')
          },
        },
        success (data) {
          s.loadingModal = false;
          s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
          if (data.getret === 0) {
            s.getDepartmentUserData();
            s.visiable = false;
          }
        }
      })
    },
    delUser () {
      if (this.selectList.length > 0) {
        let ids = [];
        this.selectList.forEach(item => {
          ids.push(item.userid);
        })
        var s = this;
        zmitiUtil.ajax({
          remark: 'delDepartmentUser',
          data: {
            action: departmentAction.delDepartmentUser.action,
            condition: {
              companyid: company.companyid,
              departmentid: this.curNode.departmentid,
              userids: ids.join(',')
            },
          },
          success (data) {
            s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
            if (data.getret === 0) {
              s.getDepartmentUserData();
            }
          }
        })
      } else {
        this.$Message.warning('请选中要删除的用户');
      }
    },
    userChange (e) {
      this.userCondition.page_index = e - 1;
      this.getAllUser();
    },
    change (e) {
      this.condition.page_index = e - 1;
      this.getDepartmentUserData();
    },
    closeMaskPage () {//关闭侧弹框
      this.$refs['ruleForm'].resetFields();
      Vue.obserable.trigger({ type: 'toggleMask', data: false });
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
          if (data.getret === 0) {
            let children = [], selectNode = undefined;
            let treeData = [];
            data.list.forEach((d, index) => {
              let select = index == 0 ? true : false;
              let item = {
                title: d.departmentname,
                departmentname: d.departmentname,
                departmentid: d.departmentid,
                fatherid: d.fatherid,
                status: d.status,
                selected: select
              };
              let item2 = {
                title: d.departmentname,
                departmentname: d.departmentname,
                departmentid: d.departmentid,
                fatherid: d.fatherid,
                status: d.status,
                checked: false
              };
              children.push(item);
              treeData.push(item2);
              select && (selectNode = item);
            })
            // s.departmentTree[0].children = children;
            s.departmentData = treeData;
            s.curNode = selectNode;
            s.getDepartmentUserData();
          }
        }
      })
    },
    getDepartmentUserData () {
      let s = this;
      let action = this.curNode.departmentid ? departmentAction.getDepartmentUserList.action : departmentAction.getCompanyUserList.action
      let conditions = Object.assign({
        companyid: company.companyid,
        departmentid: this.curNode.departmentid
      }, this.condition);
      s.dataSource = [];
      s.total = 0;
      s.loading = true;
      zmitiUtil.ajax({
        remark: this.curNode.departmentid ? "getDepartmentUserList" : "getCompanyUserList",
        data: {
          action: action,
          condition: conditions
        },
        success (data) {
          s.loading = false;
          if (data.getret === 0) {
            s.dataSource = data.list;
            s.total = data.total;
          } else {
            s.$Message.error(data.msg || data.getmsg);
          }
        }
      })
    },
    adminAction (name) {//保存or 修改
      console.log(this.formObj)
      this.$refs[name].validate((valid) => {
        if (valid) {
          let action = this.formObj.departmentid ? departmentAction.editDepartment.action : departmentAction.addDepartment.action;
          let info = Object.assign({
            companyid: company.companyid,
            fatherid: 0,
            status: 1
          }, this.formObj);
          let s = this;
          s.saveDisabled = true;
          zmitiUtil.ajax({
            remark: this.formObj.departmentid ? 'editDepartment' : 'addDepartment',
            data: {
              action,
              info
            },
            error (e) {
              s.saveDisabled = false;
            },
            success (data) {
              s.saveDisabled = false;
              s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
              if (data.getret === 0) {
                s.closeMaskPage();
                s.getDepartmentData();
              }
            }
          })
        }
      })
    },

  },
}
</script>