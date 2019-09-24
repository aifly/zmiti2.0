<template>
  <div class="zmiti-inquire-main-ui lt-full">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>{{columntitle}}</div>
        <div>
          <Button type="primary" @click="goback()">返回</Button>
        </div>
      </header>
      <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 130+'px' }">
        <ZmitiTable
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
  </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<script>
import Vue from "vue";
import zmitiUtil from "../../../common/lib/util";
import ZmitiTable from "../../../common/table";
export default {
  props: ["obserable"],
  name: "inquireuseranswerlist",
  data() {
    return {
      columntitle:'',
      inquireActions: zmitiUtil.inquireActions,
      company: zmitiUtil.getCurrentCompanyId(),
      total: 0,
      loading: false,
      viewH: window.innerHeight,
      productid: 0,
      columns: [
        {
          title: "编号",
          key: "collectid",
           width: 80,
          align: "center"
        },
        {
          title: "答卷人",
          key: "username",
           width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", {}, params.row.user.username);
          }
        },
        {
          title: "联系方式",
          key: "contact",
           width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", {}, params.row.user.contact);
          }
        },
        {
          title: "答卷时间",
          key: "createtime",
           width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", {}, zmitiUtil.formatDate(params.row.createtime));
          }
        },
        {
          title: "答案文本",         
          key: "othertext",
          align: "center"
        }
      ],
      dataSource: [],
      condition: {
        page_index: 0,
        page_size: 20
      },
      inquireid:'',
      questionid:''
    };
  },
  components: {
    ZmitiTable
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.questionid = this.$route.params.questionid;
      this.inquireid = this.$route.params.inquireid;
      this.columntitle = this.$route.params.title;
      this.getDataList();
    },
    goback() {
      window.history.go(-1);
    },
    change (e) {
      this.condition.page_index = e - 1;
      this.getDataList();
    },
    getDataList() {
      let s = this;
      s.loading = true;
      zmitiUtil.ajax({
        remark: "getInquireUserAnswer",
        data: {
          action: this.inquireActions.getInquireUserAnswer.action,
          condition: {
            page_index: this.condition.page_index,
            page_size: this.condition.page_size,
            inquireid: Number(this.inquireid),
            questionid: Number(this.questionid)
          }
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
    }
  }
};
</script>
 