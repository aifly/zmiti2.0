<template>
  <div class="zmiti-inquire-main-ui">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>
          <span>{{columntitle}}</span>
        </div>
        <div>
          <Button type="primary" @click="goback()">返回</Button>
        </div>
      </header>
      <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 110+'px'}">
        <div class="zmiti-tabs-select">
          <Tabs @on-click="currentTabs">
            <TabPane label="调查结果" name="result"></TabPane>
            <TabPane label="调查用户" name="user"></TabPane>
          </Tabs>
        </div>
        <!-- <section class="zmiti-list-where" style="margin-top:10px;">
          <Input placeholder="请输入手机号" v-model="mobile" style="width: 200px;"></Input>
          <div class="zmiti-search-input">
            <Input placeholder="请输入报名者姓名" v-model="username" style="width: 200px;"></Input>
          </div>
          <Button icon="md-search" @click="searchHandle">搜索</Button>
        </section>-->
        <div v-show="currTab == 'result'" class="zmiti-user-table">
          <Table :loading="resultLoading" :data="resultDataSource" :columns="resultColumns"></Table>
        </div>
        <ZmitiTable
          v-show="currTab == 'user'"
          :loading="loading"
          :dataSource="dataSource"
          :columns="columns"
          :change="change"
          :current="condition.page_index+1"
          :page-size="condition.page_size"
          :total="total"
          @getSelection="getSelection"
        ></ZmitiTable>
      </div>
    </div>
    <ZmitiMask v-model="showDetailPage" @closeMaskPage="closeMaskPage">
      <div slot="mask-content">
        <section class="zmiti-add-form zmiti-scroll">
          <header class="zmiti-add-header">
            <img :src="imgs.back" alt @click="closeMaskPage" />
            <span>{{columntitle}}</span>
          </header>
        <div class="zmiti-add-form-C ">
        <div v-for="(item,index) in anserData" :key="item.questionid" class="zmiti-question">
          <div class="question-title">
            <div>
              <span>{{index+1}}.</span><span>{{item.questionlabe}}</span>
            </div>
            <div>
            <img v-if="item.questionurl != ''" :src="item.questionurl||imgs.defaultImg" alt />
            </div>            
          </div>
          <div v-if="item.questiontype == 0" class="question-option">
            <div v-for="option in item.options" :key="'opt'+option.optionsid">
              <input type="radio" :checked="option.optionsid == item.coloect_options.optionsids[0]" :value="option.optionsid" disabled>
              <img v-if="option.optionsurl != ''" :src="option.optionsurl||imgs.defaultImg" alt />
              <span>{{option.options}}</span>
            </div>
          </div>
          <div v-if="item.questiontype == 1" class="question-option">
            <div v-for="option in item.options" :key="'opt'+option.optionsid">
              <input type="checkbox" :checked="item.coloect_options.optionsids.includes(''+option.optionsid)" :value="option.optionsid" disabled>
              <img v-if="option.optionsurl != ''" :src="option.optionsurl||imgs.defaultImg" alt />
              <span>{{option.options}}</span>
            </div>
          </div>
          <div v-if="item.questiontype == 2" class="question-option">
            <Input v-model="item.coloect_options.othertext" disabled></Input>
          </div>
          <div v-if="item.questiontype == 3" class="question-option">
            <Input
              v-model="item.coloect_options.othertext"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              disabled
            ></Input>
          </div>
        </div>
        </div>
        <div class="zmiti-add-form-item zmiti-add-btns">
          <Button size="large" @click="closeMaskPage">关闭</Button>
        </div>        
        </section>
      </div>
    </ZmitiMask>
  </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<script>
import Vue from "vue";
import zmitiUtil from "../../../common/lib/util";
import ZmitiTable from "../../../common/table";
import OptionsRow from "./optionsrow";
import ZmitiMask from "../../../common/mask";
export default {
  props: ["obserable"],
  name: "inquirelist",
  data() {
    return {
      showDetailPage: -1,
      columntitle: "用户调查",
      currTab: "result",
      imgs: window.imgs,
      loading: true,
      viewH: window.innerHeight,
      productid: 0,
      inquireid: undefined,
      inquireActions: zmitiUtil.inquireActions,
      company: zmitiUtil.getCurrentCompanyId(),
      total: 0,
      loading: false,
      resultLoading: false,
      resultDataSource: [],
      dataSource: [],
      anserData: [],
      resultColumns: [
        {
          type: "expand",          
          width: 50,
          render: (h, params) => {
            if ([0, 1].includes(params.row.questiontype)) {
              let total = 0;
              params.row.options.forEach(element => {
                total += element.number;
              });
              params.row.options.forEach(element => {
                if (total > 0) {
                  element.percent = (element.number / total) * 100;
                } else {
                  element.percent = 0;
                }
              });
              return h(OptionsRow, {
                props: {
                  options: params.row.options
                }
              });
            } else {
              return h("div", {}, "");
            }
          }
        },
        {
          title: "图片",
          key: "questionurl",
          width: 150,
          render: (h, params) => {
            let url = params.row.questionurl;
            console.log(h);
            if (url != "") {
              return h("img", {
                attrs: {
                  src: url
                },
                style: {
                  height: "100px",
                  margin: "5px"
                }
              });
            } else {
              return h("span", {}, "");
            }
          }
        },
        {
          title: "问题",
          key: "questionlabe"
        },
        {
          title: "类型",
          key: "questiontype",
          render: (h, params) => {
            let type = params.row.questiontype;
            let typeName = "";
            if (type == 0) {
              typeName = "单选";
            } else if (type == 1) {
              typeName = "多选";
            } else if (type == 2) {
              typeName = "单行";
            } else if (type == 3) {
              typeName = "多行";
            }
            return h("div", {}, typeName);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
          render: (h, params) => {
            if([0,1].includes(params.row.questiontype)){
              return h("div",{},'');
            }else{
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      cursor: "pointer",
                      color: "rgb(0, 102, 204)"
                    },
                    on: {
                      click: () => {
                         this.$router.push({ name: 'inquireuseranswerlist', params: { inquireid: this.inquireid, questionid: params.row.questionid,title:params.row.questionlabe } })
                        // this.getAnserText(params.row);
                      }
                    }
                  },
                  "查看详情信息"
                )
              ]);
            }
          }
        }
      ],
      columns: [
        {
          title: "编号",
          key: "vuid",
          align: "left",
          width: 68
        },
        {
          title: "答卷人",
          key: "username",
          align: "left"
        },
        {
          title: "手机号",
          key: "contact",
          align: "left"
        },
        {
          title: "调查时间",
          key: "createtime",
          align: "left",
          render: (h, params) => {
            return h("div", {}, zmitiUtil.formatDate(params.row.createtime));
          }
        },
        {
          title: "邮箱",
          key: "emaill",
          align: "left"
        },
        {
          title: "提交IP",
          key: "clientip",
          align: "left"
        },
        {
          title: "备注",
          key: "remarks",
          align: "left"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    color: "rgb(0, 102, 204)"
                  },
                  on: {
                    click: () => {
                      this.getAnserData(params.row);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      condition: {
        page_index: 0,
        page_size: 10
      },
      selectList: []
    };
  },
  components: {
    ZmitiTable,
    OptionsRow,
    ZmitiMask
  },
  created() {},
  mounted() {
    this.productid = this.$route.params.productid;
    this.inquireid = this.$route.params.id;
    this.columntitle = this.$route.params.title;
    this.getDataList();
    this.getResultDataList();
  },
  methods: {
    closeMaskPage() {
      //关闭侧弹框
      Vue.obserable.trigger({ type: "toggleMask", data: false });
    },
    getAnserData(data) {
      let s = this;
      s.anserData = [];
      zmitiUtil.ajax({
        remark: "getInquireResult",
        data: {
          action: this.inquireActions.getInquireResult.action,
          condition: {
            page_index: 0,
            page_size: 1000,
            productid: this.productid,
            companyid: this.company.companyid,
            inquireid: Number(this.inquireid),
            vuid: data.vuid
          }
        },
        success(data) {
          if (data.getret === 0) {
            s.anserData = data.list;
          } else {
            s.$Message["error"]("获取用户答卷失败");
          }
        }
      });
      Vue.obserable.trigger({
        type: "toggleMask",
        data: true
      });
    },
    goback() {
      window.history.go(-1);
    },
    currentTabs(val) {
      //切换信息类型
      console.log(val, "当前标签");
      this.currTab = val;
    },
    change(e) {
      this.condition.page_index = e - 1;
      this.getDataList();
    },
    searchHandle() {
      //搜索
      this.condition.page_index = 0;
      this.getDataList();
    },
    getDataList() {
      let s = this;
      s.loading = true;
      let conditions = Object.assign(
        {
          companyid: this.company.companyid,
          productid: this.productid,
          inquireid: this.inquireid
        },
        this.condition
      );
      zmitiUtil.ajax({
        remark: "getPartyEnteredList",
        data: {
          action: this.inquireActions.getUserInquireList.action,
          condition: conditions
        },
        error() {
          s.loading = false;
        },
        success(data) {
          s.loading = false;
          if (data.getret === 0) {
            s.total = data.total;
            s.dataSource = data.list;
          }
        }
      });
    },
    getResultDataList() {
      let s = this;
      s.resultLoading = true;
      zmitiUtil.ajax({
        remark: "getQuestionList",
        data: {
          action: this.inquireActions.getQuestionList.action,
          condition: {
            page_index: 0,
            page_size: 1000,
            companyid: this.company.companyid,
            inquireid: Number(this.inquireid),
            productid: Number(this.productid)
          }
        },
        error() {
          s.resultLoading = false;
        },
        success(data) {
          s.resultLoading = false;
          let arr = [];
          if (data.getret === 0) {
            s.resultDataSource = data.list;
            s.resultDataSource.forEach(question => {
              if ([2, 3].includes(question.questiontype)) {
                question._disableExpand=true;
              }else{
                question._expanded=true;
              }
            });
          } else {
            s.$Message["error"](data.msg || data.getmsg);
          }
        }
      });
    },
    getSelection(data) {
      this.selectList = data;
    },
  }
};
</script>
 