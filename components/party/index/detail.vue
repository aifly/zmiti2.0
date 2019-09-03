<template>
  <div class="zmiti-partydetail-main-ui">
    <div class="zmiti-list-main">
      <div class="zmiti-partynews-table lt-full">
        <header class="zmiti-tab-header">
          <div>
            <span>{{columntitle}}</span>
          </div>
          <div>
            <Button type="primary" @click="goback()">返回</Button>
          </div>
        </header>
        <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 110+'px'}">
          <div class="zmiti-partydetail-form">
            <Form :model="formObj" :label-width="120" :rules="ruleValidate" ref="ruleForm">
              <FormItem label="活动名称：" prop="partyname">
                <Input v-model="formObj.partyname" placeholder="活动名称"></Input>
              </FormItem>
              <FormItem label="活动Banner图片：" prop="partyurl">
                <div><Button icon="ios-cloud-upload-outline" @click="showImg= true">选择图片</Button></div>
                <Input v-model="formObj.partyurl" placeholder="活动Banner图片"></Input>
              </FormItem>
              <FormItem label="开始时间：" prop="begintime">
                <DatePicker
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  v-model="formObj.begintime"
                  placeholder="开始时间"
                ></DatePicker>
              </FormItem>
              <FormItem label="结束时间：" prop="endtime">
                <DatePicker
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  v-model="formObj.endtime"
                  placeholder="结束时间"
                ></DatePicker>
              </FormItem>
              <FormItem label="活动描述：">
                <div class="edit_container">
                  <quill-editor
                    v-model="formObj.abstract"
                    ref="myQuillEditor"
                    :options="editorQuillOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                  ></quill-editor>
                </div>
              </FormItem>
              <FormItem label>
                <Button type="primary" @click="adminAction">提交</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择图片 -->
		<Modal v-model="showImg" title='资料库' width='800'>
			<ResourceList v-if='showImg' :isAdmin='false' :isDialog='true' @onFinished='onFinishChoose'></ResourceList>
			<div class="zmiti-resourcelist-footer"  slot='footer'>
				<Button style='width:100px;' @click="showImg=false;">取消</Button>
				<Button style='width:100px;' type='primary' @click='chooseImg'>确定</Button>
			</div> 
		</Modal>
  </div>
</template>
<style type="text/css">
.ql-container {
  min-height: 200px;
}
.ql-snow {
  line-height: 24px !important;
}
.edit_container {
  background: #ffffff;
}
</style>
<style lang="scss" scoped>
@import "./detail.scss";
</style>
<script>
import Vue from 'vue';
import ResourceList from '../../../common/resourcelist'
import zmitiUtil from '../../../common/lib/util';
import { quillEditor } from 'vue-quill-editor'
import '../../../common/css/quill.css'
export default {
  props: ['obserable'],
  name: 'zmitiindex',
  data () {
    let timeValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入活动开始/结束时间"));
      }
      var date1 = new Date(value);
      if (rule.fullField == 'begintime' && this.formObj.endtime != "" && date1.getTime() >= new Date(this.formObj.endtime).getTime()) {
        return callback(new Error("活动开始时间不能大于活动结束时间"));
      }
      if (rule.fullField == 'endtime' && this.formObj.begintime != "" && date1.getTime() <= new Date(this.formObj.begintime).getTime()) {
        return callback(new Error("活动结束时间不能小于活动开始时间"));
      }
      return callback();
    }
    return {
      showImg:false,
      currentChooseImg:{},
      isedit: '',
      columntitle: '',
      imgs: window.imgs,
      loading: true,
      viewH: window.innerHeight,
      productid: 0,
      partyActions: zmitiUtil.partyActions,
      company: zmitiUtil.getCurrentCompanyId(),
      formObj: {
        partyid: '',
        partyname: "",
        partyurl: '',
        begintime: '',
        endtime: '',
        abstract: ''
      },
      ruleValidate: {
		  partyname: [{ required: true, message: '请输入活动名称', trigger: ['change','blur'] }],
		  partyurl:[{type: 'url', message: '请输入合法的URL链接', trigger: ['change','blur'] }],
        begintime: [{ required: true, validator: timeValidate, trigger: 'change' }],
        endtime: [{ required: true, validator: timeValidate, trigger: 'change' }],
      },
      editorQuillOption: {
        modules: {
          toolbar: [
            ['bold', { 'indent': '-1' }, { 'indent': '+1' }, { 'color': [] }, { 'align': [] }, 'clean']
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
    }
  },
  components: {
    quillEditor,
    ResourceList
  },
  created () {
  },
  mounted () {
	 this.isedit = this.$route.params.isedit;
	 this.productid = this.$route.params.productid;
   this.columntitle = this.isedit == 'add' ? '添加活动' : '修改活动';
   this.isedit == 'edit' && this.getPartyDetail();
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    goback () {
      window.history.go(-1);
    },
    adminAction () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let action = this.formObj.partyid ? this.partyActions.editParty.action : this.partyActions.addParty.action;
          var s = this;
          let info = {
            productid: this.productid,
            companyid: this.company.companyid,
            partyurl:this.formObj.partyurl,
            partyname:this.formObj.partyname,
            abstract:this.formObj.abstract,
            begintime:new Date(this.formObj.begintime).getTime()/1000,
            endtime:new Date(this.formObj.endtime).getTime()/1000
          };
          if (this.isedit == 'edit') {//编辑
            info.partyid = this.$route.params.id;
          }
          zmitiUtil.ajax({
            remark: this.formObj.partyid ? 'editParty' : 'addParty',
            data: {
              action,
              info
            },
            success (data) {
              s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
              setTimeout(() => {
                window.history.go(-1);
              }, 1000);
            }
          })
        }
      })
    },
    contentChange (val) { // 改变父组件数据
      this.formObj.abstract = val
    },
    getPartyDetail () {
      var s = this;
      zmitiUtil.ajax({
        remark: "getPartyDetail",
        data: {
          action: this.partyActions.getPartyDetail.action,
          condition:{
            companyid:this.company.companyid,
            partyid: this.$route.params.id,
            productid: this.productid
          }
        },
        error () {
          s.loading = false;
        },
        success (data) {
          s.loading = false;
          console.log(data.list, '获取详情');
          if (data.getret === 0) {
            s.formObj = {
              partyid: data.list.partyid,
              partyname: data.list.partyname,
              partyurl: data.list.partyurl,
              begintime: new Date(data.list.begintime*1000),
              endtime: new Date(data.list.enteredtime*1000),
              abstract: data.list.abstract
            }
          }
        }
      })
    },
    onFinishChoose(item){//选择word后
				this.currentChooseImg = item;
		},
    chooseImg(){//选择多个附件
      this.showImg = false;
			this.formObj.partyurl=this.currentChooseImg.filepath;
    },
    onEditorReady (editor) { }, // 准备编辑器
    onEditorBlur () { }, // 失去焦点事件
    onEditorFocus () { }, // 获得焦点事件
    onEditorChange (quill, html, text) {
    } // 内容改变事件
  }
}
</script>
 