<template>
  <div class="zmiti-submit-main-ui">
    <div class="zmiti-list-main">
      <header class="zmiti-tab-header">
        <div>
          <span v-if="companyname">{{companyname}} ——</span>用户审核
        </div>
        <div>
          <Button :loading="loading" @click="getDataList()" type="primary">刷新</Button>
        </div>
      </header>
      <!-- <section class="zmiti-list-where">
        用户编号 <input type="text">
      </section> -->

      <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 135+'px' }">
        <ZmitiTable
          :height="(viewH - 195)"
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

import Vue from 'vue';
import zmitiUtil from '../../common/lib/util';
import ZmitiTable from '../../common/table/';

var { companyActions, userActions, formatDate } = zmitiUtil;

export default {
  props: ['obserable'],
  name: 'zmitiindex',
  data () {
    return {
      companyname: zmitiUtil.getCurrentCompanyId().companyname,
      total: 0,
      loading: true,
      viewH: window.innerHeight,
      viewW: window.innerWidth,
      dataSource: [],
		status: [
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
        },
        {
          value: 3,
          label: "审核"
        },
        {
          value: 4,
          label: "审核驳回"
        }
      ],
      columns: [
        {
          title: "用户名",
          key: 'username',
          align: 'center',
          render: (h, params) => {
            return h('div', {}, params.row.user.username);
          },
        },
        {
          title: "真实姓名",
          key: 'realname',
          align: 'center',
          render: (h, params) => {
            return h('div', {}, params.row.user.realname);
          },
        },
        {
          title: "加入时间",
          key: 'joindate',
          align: 'center',
          width: 160,
          render: (h, params) => {
            return h('div', {}, formatDate(params.row.joindate));
          },
        },
        {
          title: "用户状态",
          key: 'status',
          align: 'center',
         render: (h, params) => {
            let s = this.status.filter(item => {
              return item.value == params.row.status
            })
            return h("div", {}, s[0].label);
          }
        },
        {
          width: 120,
          title: "是否单位管理员",
          key: 'islead',
          align: 'center',
          render: (h, params) => {
            return h('div', {}, params.row.islead === 1 ? '是' : "否");
          },
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('span', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  cursor: 'pointer',
                  color: "#3390ff",
                },
                on: {
                  click: () => {
                    this.checkAction(params.row.ucid, 1);
                  }
                }
              }, '通过'),

            ]);
          }
        }
      ],
      condition: {
        page_index: 0,
        page_size: 10,
      },
    }
  },
  components: {
    ZmitiTable
  },
  mounted () {
    this.getDataList();
  },
  methods: {
    change (e) {
      this.condition.page_index = e - 1;
      this.getMyCheckList();
    },
    checkAction (userid, status) {
      var s = this;
      zmitiUtil.ajax({
        remark: 'editCompanyUser',
        data: {
          action: userActions.editCompanyUser.action,
          ucid: userid,
          status
        },
        success (data) {
			 s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg);
			 this.condition.page_index = 0;
          s.getDataList()
        }
      })
    },
    change (e) {
      this.condition.page_index = e - 1;
      this.getDataList();
    },
    getDataList () {
      var s = this;
      this.loading = true;
      var { condition } = this;
      condition = Object.assign(condition, {
        companyid: zmitiUtil.getCurrentCompanyId().companyid,
        status: 0
      })
      zmitiUtil.ajax({
        remark: "getCompanyUserList",
        data: {
          action: userActions.getCompanyUserList.action,
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
          }
        }
      })
    },

  }
}
</script>
 