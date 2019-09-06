<template>
  <div class="zmiti-partydetail-main-ui">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>
          <span>{{columntitle}}</span>
        </div>
        <div>
          <Button type="primary" @click="goExport()">导出</Button>
          <Button type="primary" @click="goback()">返回</Button>
        </div>
      </header>
      <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 110+'px'}">
        <section class="zmiti-list-where">
          <Input placeholder="请输入手机号" v-model="mobile" style="width: 200px;"></Input>
          <div class="zmiti-search-input">
            <Input placeholder="请输入报名者姓名" v-model="username" style="width: 200px;"></Input>
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
          @getSelection="getSelection"
        ></ZmitiTable>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "./detail.scss";
</style>
<script>
import Vue from 'vue';
import zmitiUtil from '../../../common/lib/util';
import ZmitiTable from '../../../common/table';
export default {
  props: ['obserable'],
  name: 'zmitiindex',
  data () {
    return {
      columntitle: '活动报名列表',
      mobile: '',
      username: '',
      imgs: window.imgs,
      loading: true,
      viewH: window.innerHeight,
      productid: 0,
      id: '',
      partyActions: zmitiUtil.partyActions,
      company: zmitiUtil.getCurrentCompanyId(),
      total: 0,
      loading: true,
      dataSource: [],
      columns: [
        {
          title: "编号",
          key: 'collectid',
          align: 'left',
          width: 68
        },
        {
          title: "报名人",
          key: 'username',
          align: 'left',
        },
        {
          title: "手机号",
          key: 'mobile',
          align: 'left',
        },
        {
          title: "报名时间",
          key: 'createtime',
          align: 'left',
          render: (h, params) => {
            return h('div', {}, zmitiUtil.formatDate(params.row.createtime));
          }
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
    ZmitiTable
  },
  created () {
  },
  mounted () {
    this.productid = this.$route.params.productid;
    this.id = this.$route.params.id;
    this.getDataList();
  },
  methods: {
    goback () {
      window.history.go(-1);
    },
    goExport () {

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
      let conditions = {
        companyid: this.company.companyid,
        productid: this.productid,
        partyid: this.id,
        username: this.username,
        mobile: this.mobile
      }
      // let conditions = Object.assign({
      //   companyid: this.company.companyid,
      //   productid: this.productid,
      //   partyid: this.id
      // }, this.condition)
      zmitiUtil.ajax({
        remark: "getPartyEnteredList",
        data: {
          action: this.partyActions.getPartyEnteredList.action,
          condition: conditions
        },
        error () {
          s.loading = false;
        },
        success (data) {
          s.loading = false;
          if (data.getret === 0) {
            //  s.total = data.total;
            s.dataSource = data.list;
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
 