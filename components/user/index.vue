<template>
  <div class="zmiti-submit-main-ui lt-full">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>
          <span v-if="company.companyname">{{company.companyname}} ——</span>用户列表
        </div>
        <div>
          <div class="zmiti-upload-btn">
            <input type="file" ref="file" @change="importData" />
            <Button type="primary">用户导入</Button>
          </div>
          <Button @click="add()" type="primary">添加用户</Button>
          <Button :loading="loading" @click="getDataList()" type="primary">刷新</Button>
        </div>
      </header>
      <section class="zmiti-list-where">
        <div>
        <Select v-model="statusSearch" style="width:200px; margin-right:10px" placeholder="状态">
          <Option
            :value="item.value"
            :lable="item.label"
            v-for="(item,i) in status"
            :key="i"
          >{{item.label}}</Option>
        </Select>       
        <Input
          v-model="realnameSearch"
          placeholder="真实名称"
          style="width:200px; margin-right:10px"
        ></Input>
        <Input
          v-model="usernameSearch"
          placeholder="用户名"
          style="width:200px; margin-right:10px"
        ></Input>
        <Input
          v-model="mobileSearch"
          placeholder="手机号"
          style="width:200px; margin-right:10px"
        ></Input>
        <Input
          v-model="emailSearch"
          placeholder="邮箱"
          style="width:200px; margin-right:10px"
        ></Input>
        </div>
        <div>
        <Select v-model="sexSearch" style="width:200px; margin-right:10px" placeholder="性别">
          <Option :value="-1" lable="">全部</Option>
          <Option :value="0" lable="女">女</Option>
          <Option :value="1" lable="男">男</Option>
        </Select>
        <Input
          v-model="nationSearch"
          placeholder="民族"
          style="width:200px; margin-right:10px"
        ></Input>
        <DatePicker
          style="width:200px; margin-right:10px"
          type="datetime"
          format="yyyy-MM-dd"
          v-model="jointimeSearch"
          placeholder="加入时间"
        ></DatePicker>
        <Button icon="md-search" @click="searchHandle">搜索</Button>
        </div>
      </section>

      <div class="zmiti-submit-main" :style="{height:viewH - 220+'px' }">
        <ZmitiTable
          :height="(viewH - 280)"
          :loading="loading"
          :dataSource="dataSource"
          :columns="columns"
          :change="change"
          :current="condition.page_index+1"
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
              <span>{{isAdd == 1 ? '添加用户' : '用户详情'}}</span>
            </header>
            <!-- <h2 style="height:40px;"></h2> -->
            <Form
              class="zmiti-add-form-C"
              :model="formObj"
              :label-width="100"
              :rules="ruleValidate"
              ref="ruleForm"
            >
              <FormItem label="用户名：" prop="username">
                <Input v-model="formObj.username" placeholder="用户名：" :disabled="isAdd == 0" />
              </FormItem>
              <FormItem label="真实姓名：" prop="realname">
                <Input v-model="formObj.realname" placeholder="真实姓名：" :disabled="isAdd == 0" />
              </FormItem>
              <FormItem label="密码：" prop="userpwd">
                <!-- <Button
                  size="small"
                  type="default"
                  @click="initPwd"
                >{{formObj.userpwd != ''?'初始化密码':'已初始化'}}}</Button>-->
                <Input v-model="formObj.userpwd" placeholder="密码：" :disabled="isAdd == 0" />
              </FormItem>
              <FormItem label="手机号：" prop="usermobile">
                <Input v-model="formObj.usermobile" placeholder="手机号：" :disabled="isAdd == 0" />
              </FormItem>
              <FormItem label="邮箱：" prop="useremail">
                <Input v-model="formObj.useremail" placeholder="邮箱：" :disabled="isAdd == 0" />
              </FormItem>
              <FormItem label="状态：" prop="status">
                <RadioGroup v-model="formObj.status">
                  <Radio :value="1" :label="1">正常</Radio>
                  <Radio :value="0" :label="0">禁用</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
            <div class="zmiti-add-form-item zmiti-add-btns">
              <Button size="large" type="primary" @click="adminAction">确定</Button>
              <!-- <Button v-if="isAdd == 0" size="large" type="default" @click="closeMaskPage">关闭</Button> -->
            </div>
          </section>
        </transition>
      </div>
    </ZmitiMask>

    <Modal v-model="visiable" title="待提交的用户" width="800">
      <div class="zmiti-import-loading">
        <span></span>
      </div>
      <Table :columns="excelColumns" :data="excel_list" :height="viewH*.6"></Table>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<script>
import Vue from "vue";
import zmitiUtil from "../../common/lib/util";
import ZmitiMask from "../../common/mask/";
import ZmitiTable from "../../common/table/";

var { companyActions, userActions, formatDate } = zmitiUtil;

import { manuscriptStatus } from "../../common/config";

export default {
  props: ["obserable"],
  name: "zmitiindex",
  data () {
    let numberValidate = (rule, value, callback) => {
      if (!value || value == "") {
        return callback(new Error("请输入手机号"));
      }
      var reg = /^[1][0-9]{10}$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入合法的手机号"));
      }
      return callback();
    };
    return {
      isAdd: 0,
      nationSearch:'',
      jointimeSearch:'',
      emailSearch:'',
      mobileSearch:'',
      usernameSearch:'',
      realnameSearch:'',
      sexSearch:-1,
      statusSearch: 1,
      status: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "禁用"
        },
        {
          value: 1,
          label: "正常"
        },
        {
          value: 2,
          label: "已删除"
        // },
        // {
        //   value: 3,
        //   label: "审核"
        // },
        // {
        //   value: 4,
        //   label: "审核驳回"
        }
      ],
      visiable: false,
      company: zmitiUtil.getCurrentCompanyId(),
      imgs: window.imgs,
      total: 0,
      showDetailPage: -1,
      loading: true,
      formObj: {
        ucid:undefined,
        userid: undefined,
        username: "",
        realname: "",
        userpwd: "",
        usermobile: "",
        useremail: "",
        status: 1
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          { min:4, max: 16, message: '请输入6-16位用户名', trigger: 'blur' }
        ],
        realname: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        userpwd: [{ required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: '请输入6-16位密码', trigger: 'blur' }],
        usermobile: [
          {
            required: true,
            validator: numberValidate,
            message: "请输入合法的手机号",
            trigger: "blur"
          }
        ],
        useremail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ]
      },
      viewH: window.innerHeight,
      viewW: window.innerWidth,
      dataSource: [],
      columns: [
        {
          title: "用户名",
          key: "username",
          align: "center",
          render: (h, params) => {
            return h("div", {}, params.row.user.username);
          }
        },
        {
          title: "真实姓名",
          key: "realname",
          align: "center",
          render: (h, params) => {
            return h("div", {}, params.row.user.realname);
          }
        },
        {
          title: "性别",
          key: "sex",
          align: "center",
          render: (h, params) => {
            return h("div", {}, params.row.user.sex == 1 ? "男" : "女");
          }
        },
        {
          title: "手机号",
          key: "usermobile",
          align: "center"
        },
        {
          title: "加入时间",
          key: "joindate",
          align: "center",
          width: 160,
          render: (h, params) => {
            return h("div", {}, formatDate(params.row.joindate));
          }
        },
        {
          title: "用户状态",
          key: "status",
          align: "center",

          render: (h, params) => {
            let s = this.status.filter(item => {
              return item.value == params.row.status
            })
            return h("div", {}, s[0].label);
          }
        },
        {
          title: "是否单位管理员",
          key: "islead",
          align: "center",
          render: (h, params) => {
            return h("div", {}, params.row.islead === 1 ? "是" : "否");
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          render: (h, params) => {
            if(params.row.status == 0 || params.row.status == 1){
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      cursor: "pointer",
                      color: "#3390ff",
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {
                        this.formObj = {
                          userid: params.row.user.userid,
                          ucid: params.row.ucid,
                          username: params.row.user.username,
                          realname: params.row.user.realname,
                          userpwd: params.row.user.userpwd,
                          usermobile: params.row.user.usermobile,
                          useremail: params.row.user.useremail,
                          status: params.row.status
                        };
                        this.isAdd = 0;
                        Vue.obserable.trigger({ type: "toggleMask", data: true });
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "span",
                  {
                    style: {
                      cursor: "pointer",
                      color: "#3390ff",
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {
                        this.initPwd(params.row)
                      }
                    }
                  },
                  "初始化密码"
                ),
                h(
                  "Poptip",
                  {
                    props: {
                      confirm: true,
                      title: "确定要删除吗？",
                      placement: "left"
                    },
  
                    on: {
                      "on-ok": () => {
                        this.delete(params.row.ucid);
                      }
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        props: {
                          type: "error",
                          size: "small"
                        },
                        style: {
                          cursor: "pointer",
                          color: "#3390ff"
                        },
                        on: {
                          click: () => { }
                        }
                      },
                      "删除"
                    )
                  ]
                )
              ]);
            }else{
              return h("div", {}, '');
            }
          }
        }
      ],
      condition: {
        page_index: 0,
        page_size: 10
      },
      userinfo: {},
      excel_list: [
        {
          username: "test",
          username_exist: 1,
          realname: "测试",
          usermobile: 13720885914,
          usermobile_exist: 0,
          useremail: "27489658@qq.com",
          useremail_exist: 0
        }
      ],
      excelColumns: [
        {
          title: "用户名",
          key: "username",
          align: "center",
          render: (h, params) => {
            return h("Input", {
              props: {
                value: params.row.username
              },
              on: {
                "on-change": e => {
                  this.excel_list[params.index].username = e.target.value;
                }
              }
            });
          }
        },
        {
          title: "真实姓名",
          key: "realname",
          align: "center",
          render: (h, params) => {
            return h("Input", {
              props: {
                value: params.row.realname
              },
              on: {
                "on-change": e => {
                  this.excel_list[params.index].realname = e.target.value;
                }
              }
            });
          }
        },
        {
          title: "手机号",
          key: "usermobile",
          align: "center",
          render: (h, params) => {
            return h("Input", {
              props: {
                value: params.row.usermobile
              },
              on: {
                "on-change": e => {
                  this.excel_list[params.index].usermobile = e.target.value;
                }
              }
            });
          }
        },
        {
          title: "邮箱",
          key: "useremail",
          align: "center",
          render: (h, params) => {
            return h("Input", {
              props: {
                value: params.row.useremail
              },
              on: {
                "on-change": e => {
                  this.excel_list[params.index].useremail = e.target.value;
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "",
          align: "center",
          render: (h, params) => {
            return h("div", {}, [
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "确定要删除吗？",
                    placement: "left"
                  },

                  on: {
                    "on-ok": () => {
                      this.excel_list.splice(params.index, 1);
                      //this.delete(params.row.ucid);
                    }
                  }
                },
                [
                  h(
                    "span",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        cursor: "pointer",
                        color: "#3390ff"
                      },
                      on: {
                        click: () => { }
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    ZmitiMask,
    ZmitiTable
  },

  beforeCreate () {
    //var validate = sysbinVerification.validate(this);
    //zmitiUtil.clearCookie('login');
    ///this.validate = validate;
  },
  mounted () {
    window.s = this;

    this.getDataList();

    for (var i = 0; i < 5; i++) {
      this.excel_list = this.excel_list.concat(this.excel_list);
    }
  },

  watch: {},

  methods: {
    importData () {
      var userinfo = zmitiUtil.getUserInfo();
      if (!userinfo.ui) {
        return;
      }
      var s = this;
      var formData = new FormData();

      formData.append("userid", userinfo.ui.userid);
      formData.append("token", userinfo.ui.token);
      formData.append("type", 1);
      formData.append("file", this.$refs["file"].files[0]);
      axios
        .post(window.config.baseUrl + "index/importexcel/index", formData)
        .then(data => {
          s.$Message[data.getret === 0 ? "success" : "error"](data.msg);
        });
    },
    change (e) {
      this.condition.page_index = e - 1;
      this.getDataList();
    },
    resetFileds () {
      this.formObj.userid = '';
      this.formObj.ucid = '';
      this.formObj.username = '';
      this.formObj.realname = '';
      this.formObj.userpwd = '';
      this.formObj.usermobile = '';
      this.formObj.useremail = '';
      this.formObj.status = 1;
    },
    closeMaskPage () {
      this.resetFileds();
      Vue.obserable.trigger({
        type: "toggleMask",
        data: false
      });
    },
    initPwd(data){
      var s = this;
      zmitiUtil.ajax({
        remark: "initPwdCompanyUser",
        data: {
          action: userActions.initPwdCompanyUser.action,
          info:{
            companyid:zmitiUtil.getCurrentCompanyId().companyid,
            userids:data.user.userid+""
          }          
        },
        success (data) {
          if (data.getret === 0) {
             s.$Message["success"]("初始化密码成功");
          }else{
             s.$Message["error"](data.msg);
          }
        }
      });
    },
    delete (ucid) {
      var s = this;
      zmitiUtil.ajax({
        remark: "delCompanyUser",
        data: {
          action: userActions.delCompanyUser.action,
          ucid
        },
        success (data) {
          if (data.getret === 0) {
            s.getDataList();
            ///s.dataSource = data.list;
             s.$Message["success"]("删除成功");
          }else{
             s.$Message["error"](data.msg);
          }
        }
      });
    },
    searchHandle () {
      //搜索
      this.condition.page_index = 0;
      this.getDataList();
    },
    getDataList () {
      var s = this;
      this.loading = true;
      var { condition } = this;
      condition = Object.assign(
        {
          companyid: zmitiUtil.getCurrentCompanyId().companyid,
          departmentid:this.company.companyid,
          status: this.statusSearch == -1 ? undefined : this.statusSearch,
          sex: this.sexSearch == -1 ? undefined : this.sexSearch,
          nation: this.nationSearch,
          jointime: this.jointimeSearch,
          email: this.emailSearch,
          mobile: this.mobileSearch,
          username: this.usernameSearch,
          realname: this.realnameSearch
        },
        condition
      );
      s.total = 0;
      s.dataSource = [];
      zmitiUtil.ajax({
        remark: "getCompanyUserSearchList",
        data: {
          action: userActions.getCompanyUserSearchList.action,
          condition
        },
        error () {
          s.loading = false;
        },
        success (data) {
          s.loading = false;
          if (data.getret === 0) {
            s.total = data.total;
            s.dataSource = data.list;
          }else{
             s.$Message["error"](data.msg);
          }
        }
      });
    },
    add () {
      this.resetFileds();
      this.isAdd = 1;
      Vue.obserable.trigger({
        type: "toggleMask",
        data: true
      });
    },
    async adminAction () {
      let s = this;
      if (this.formObj.userid && this.formObj.userid != "") {
        let param = {
          action: userActions.editCompanyUser.action,
          ucid: s.formObj.ucid,
          status: s.formObj.status
        };
        this.goSave(param);
      } else {
        let action = userActions.validateCompanyUserName, opt = {
          action: action.action,
          username: this.formObj.username,
          usermobile: this.formObj.usermobile,
          useremail: this.formObj.useremail,
          type: 0
        };       
        opt.ui = zmitiUtil.getUserInfo().ui;
        let flag = await this.validateUser(action,opt);
        if(flag.data.used == 1){
          s.$Message["error"]("用户名已存在");
          return;
        }
        action = userActions.validateCompanyUserMobile;
        opt.action = action.action;
        flag = await this.validateUser(action,opt);
        if(flag.data.used == 1){
          s.$Message["error"]("手机号已存在");
          return;
        }
        action = userActions.validateCompanyUserEmail;
        opt.action = action.action;
        flag = await this.validateUser(action,opt);
        if(flag.data.used == 1){
          s.$Message["error"]("邮箱已存在");
          return;
        }
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
              let param = {
                action: userActions.registerCompanyUser.action,
                info: {
                  companyid: zmitiUtil.getCurrentCompanyId().companyid,
                  username: s.formObj.username,
                  userpwd: s.formObj.userpwd,
                  useremail: s.formObj.useremail,
                  usermobile: s.formObj.usermobile,
                  realname: s.formObj.realname,
                  status: s.formObj.status
                }
              };
              this.goSave(param);
            }
        });
      }
    },
    goSave (param) {
      let s = this;
      zmitiUtil.ajax({
        remark: this.formObj.userid ? "editCompanyUser" : "registerCompanyUser",
        data: param,
        success (data) {
          s.$Message[data.getret === 0 ? "success" : "error"](data.msg);
          if (data.getret === 0) {
            s.getDataList();
            s.closeMaskPage();
          }
        }
      });
    },
    async validateUser(action,opt){
      return  await axios.post(window.config.baseUrl + '?name=' + (action.remark || '').toLowerCase(), JSON.stringify(opt))
    },
  }
};
</script>
 