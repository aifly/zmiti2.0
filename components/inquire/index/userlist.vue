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
import OptionsRow from './optionsrow';
export default {
  props: ['obserable'],
  name: 'inquirelist',
  data () {
    return {
      columntitle: '用户调查',
      currTab: 'result',
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
      resultColumns: [{
        type: 'expand',
        width: 50,
        render: (h, params) => {
          if([0,1].includes(params.row.questiontype)){
            return h(OptionsRow, {
              props: {
                options: params.row.options
              }
            })
          }else{
            return h('div', {},'')
          }
        }
      }, {
        title: '图片',
        key: 'questionurl',
        width: 150,
        render: (h, params) => {
          let url = params.row.questionurl;
          console.log(h)
          if (url != "") {
            return h('img', {
              attrs: {
                src: url
              },
              style: {
                height: '100px',
                margin: '5px'
              }
            })
          } else {
            return h('span', {}, '')
          }
        }
      }, {
        title: '问题',
        key: 'questionlabe'
      }, {
        title: '类型',
        key: 'questiontype',
        render: (h, params) => {
          let type = params.row.questiontype;
          let typeName = '';
          if (type == 0) {
            typeName = '单选';
          } else if (type == 1) {
            typeName = '多选'
          } else if (type == 2) {
            typeName = '单行'
          } else if (type == 3) {
            typeName = '多行'
          }
          return h('div', {}, typeName)
        }
      }],
      columns: [
        {
          title: "编号",
          key: 'vuid',
          align: 'left',
          width: 68
        },
        {
          title: "答卷人",
          key: 'username',
          align: 'left',
        },
        {
          title: "手机号",
          key: 'contact',
          align: 'left',
        },
        {
          title: "调查时间",
          key: 'createtime',
          align: 'left',
          render: (h, params) => {
            return h('div', {}, zmitiUtil.formatDate(params.row.createtime));
          }
        },
        {
          title: "邮箱",
          key: 'emaill',
          align: 'left',
        },
        {
          title: "提交IP",
          key: 'clientip',
          align: 'left',
        },
        {
          title: "备注",
          key: 'remarks',
          align: 'left',
        }],
      condition: {
        page_index: 0,
        page_size: 10,
      },
      selectList: []
    }
  },
  components: {
    ZmitiTable,
    OptionsRow
  },
  created () {
  },
  mounted () {
    this.productid = this.$route.params.productid;
    this.inquireid = this.$route.params.id;
    this.getDataList();
    this.getResultDataList();
  },
  methods: {
    goback () {
      window.history.go(-1);
    },
    currentTabs (val) {//切换信息类型
      console.log(val, '当前标签');
      this.currTab = val;
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
        inquireid: this.inquireid
      }, this.condition)
      zmitiUtil.ajax({
        remark: "getPartyEnteredList",
        data: {
          action: this.inquireActions.getUserInquireList.action,
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
    getResultDataList () {
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
        error () {
          s.resultLoading = false;
        },
        success (data) {
          s.resultLoading = false;
          let arr = [];
          if (data.getret === 0) {
            s.resultDataSource = data.list;
          } else {
            s.$Message['error'](data.msg || data.getmsg);
          }
        }
      })
    },
    getSelection (data) {
      this.selectList = data;
    },
  }
}
</script>
 