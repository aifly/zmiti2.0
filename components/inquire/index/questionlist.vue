<template>
  <div class="zmiti-question-main-ui">
    <div class="zmiti-list-main">
      <div class="zmiti-partynews-table lt-full">
        <header class="zmiti-tab-header">
          <div>
            <span>{{columntitle}}</span>
          </div>
          <div>
            <Button :loading="loading" type="primary" @click="save()">提交</Button>
            <Button @click="goback()">返回</Button>
          </div>
        </header>
        <div class="zmiti-submit-main zmiti-scroll" :style="{height:viewH - 110+'px'}">
          <Form class="zmiti-add-form-C" :model="questionForm" :label-width="80" ref="questionForm">
            <div
              class="zmiti-question-items"
              v-for="(item,index) in questionForm.questionList"
              :key="index"
            >
              <div class="zmiti-question-h1">
                <div class="zmiti-h1-txt">问题{{index+1}}：{{item.questionlabe}}</div>
                <div class="zmiti-block-oper">
                  <span @click="editQuestion(item,index)">{{item.status==true?'收起':'编辑'}}</span>
                  <Poptip
                    confirm
                    placement="left-start"
                    title="确定要删除这个问题吗?"
                    @on-ok="removeQuestion(index,item)"
                  >
                    <span>删除</span>
                  </Poptip>
                </div>
              </div>
              <div class="zmiti-question-inner" v-show="item.status">
                <FormItem
                  label="问题："
                  :prop="'questionList.'+index+'.questionlabe'"
                  :rules="{required: true,message: '请输入问题',trigger: 'blur'}"
                >
                  <Input v-model="item.questionlabe" placeholder="请输入问题"></Input>
                </FormItem>
                <FormItem label="图片：">
                  <div class="upload-img">
                    <img :src="item.questionurl||imgs.defaultImg" alt />
                    <Button icon="ios-cloud-upload-outline" @click="chooseQuestionImg(item)">选择图片</Button>
                    <input v-model="item.questionurl" type="hidden" />
                    <span style="margin-left: 20px;color: red;">图片建议使用宽度大于或等于 750PX的图片</span>
                  </div>
                </FormItem>
                <FormItem label="类型：">
                  <RadioGroup
                    v-model="item.questiontype"
                    @on-change="typeChange(item.questiontype,item)"
                  >
                    <Radio :label="0">单选</Radio>
                    <Radio :label="1">多选</Radio>
                    <Radio :label="2">单行</Radio>
                    <Radio :label="3">多行</Radio>
                  </RadioGroup>
                </FormItem>
                <div
                  class="zmiti-question-options"
                  v-show="[0,1].includes(item.questiontype)"
                  v-for="(opt,o) in item.option_list"
                  :key="'options'+index+'-'+o"
                >
                  <FormItem
                    :label="'选项'+(o+1)+'：'"
                    :prop="'questionList.'+index+'.option_list.' + o + '.options'"
                    :rules="{required: true, validator: checkOptions, trigger: 'blur'}"
                  >
                    <div class="zmiti-options-item-imgurl" v-if="opt.optionsurl">
                      <img :src="opt.optionsurl" alt />
                      <input v-model="opt.optionsurl" type="hidden" />
                    </div>
                    <div class="zmiti-options-item">
                      <Input v-model="opt.options" placeholder="选项内容" style="margin-right: 5px;"></Input>
                    </div>
                    <div class="zmiti-options-btns">
                      <Icon type="ios-image-outline" size="20" @click="openUploadImg(item,o)" />
                      <Icon
                        type="ios-add-circle-outline"
                        size="20"
                        @click="addOptions(index,o)"
                        v-if="item.option_list.length-1===o"
                      />
                      <Icon
                        type="ios-remove-circle-outline"
                        size="20"
                        @click="removeOptions(opt.optionsid,index,o)"
                      />
                    </div>
                    <div>
                      <span style="margin-left: 20px;color: red;">图片建议使用1：1尺寸的图</span>
                    </div>
                  </FormItem>
                </div>
              </div>
            </div>
          </Form>
          <div class="zmiti-question-btn" @click="showAddQuestion">
            <Icon type="md-add" size="20" color="#ccc" />
            <span>添加问题</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择配图 -->
    <Modal v-model="showPicture" title="资料库" width="800">
      <ResourceList
        v-if="showPicture"
        :isAdmin="false"
        :isDialog="true"
        @onFinished="onFinishPicture"
      ></ResourceList>
      <div class="zmiti-resourcelist-footer" slot="footer">
        <Button style="width:100px;" @click="showPicture=false;">取消</Button>
        <Button style="width:100px;" type="primary" @click="choosePicture">确定</Button>
      </div>
    </Modal>
    <!-- 选择子项图片 -->
    <Modal v-model="showSubimg" title="资料库" width="800">
      <ResourceList
        v-if="showSubimg"
        :isAdmin="false"
        :isDialog="true"
        @onFinished="onFinishSubimg"
      ></ResourceList>
      <div class="zmiti-resourcelist-footer" slot="footer">
        <Button style="width:100px;" @click="showSubimg=false;">取消</Button>
        <Button style="width:100px;" type="primary" @click="chooseSubimg(currentOptionIndex)">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
@import "./questionlist.scss";
</style>
<style lang="scss">
.zmiti-question-options {
  .ivu-form-item-content {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }
}
</style>
<script>
import Vue from 'vue';
import ResourceList from '../../../common/resourcelist'
import zmitiUtil from '../../../common/lib/util';
export default {
  props: ['obserable'],
  name: 'zmitiindex',
  data () {
    return {
      loading: false,
      show: false,
      showPicture: false,
      currentChoosePicture: {},
      currentOptionIndex: 0,
      currentQuestion: {},
      showSubimg: false,
      showForm: false,//现在添加/修改form
      showFormOptions: true,
      columntitle: '问卷调查问题列表',
      imgs: window.imgs,
      viewH: window.innerHeight,
      productid: 0,
      inquireid: undefined,
      inquireActions: zmitiUtil.inquireActions,
      company: zmitiUtil.getCurrentCompanyId(),
      formObj: {},
      questionForm: {
        questionList: []
      }
    }
  },
  components: {
    ResourceList
  },
  mounted () {
    this.productid = this.$route.params.productid;
    this.inquireid = this.$route.params.id;
    this.columntitle = this.$route.params.title;
    this.getQuestionList();
  },
  methods: {
    goback () {
      window.history.go(-1);
    },
    checkOptions (rule, value, callback) {
      let index = rule.fullField.split('.')[1];
      let type = this.questionForm.questionList[index].questiontype;
      if ([0, 1].includes(type) && value == '') {
        callback(new Error('请输入选项值'));
      } else {
        callback();
      }
    },
    typeChange (val, item) {
      if ([0, 1].includes(val) && item.option_list.length <= 0) {
        item.option_list.push({
          optionsid: 0,
          options: '',
          optionsurl: '',
          sort: 1
        });
      }
    },
    save () {//保存or 修改
      if (this.questionForm.questionList.length <= 0) {
        this.$Message.error('请添加问题');
        retrun;
      }
      this.$refs['questionForm'].validate((valid) => {
        if (valid) {
          let action = this.inquireActions.editQuestion.action, s = this;
          let list = [];
          s.questionForm.questionList.forEach(item => {
            if ([2, 3].includes(item.questiontype)) {
              item.option_list = [];
            }
            list.push(item);
          })
          s.loading = true;
          zmitiUtil.ajax({
            remark: 'editQuestion',
            data: {
              action,
              bi: {
                productid: s.productid,
                companyid: s.company.companyid,
                inquireid: s.inquireid
              },
              list: list
            },
            error () {
              s.loading = false;
            },
            success (data) {
              s.loading = false;
              s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
              data.getret === 0 && s.getQuestionList();
            }
          })
        }
      })
    },
    getQuestionList () {
      let s = this;
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
        success (data) {
          let arr = [];
          if (data.getret === 0) {
            data.list.forEach(element => {
              let options = [];
              element.options.forEach(o => {
                let opt = {
                  optionsid: o.optionsid,
                  options: o.options,
                  optionsurl: o.optionsurl,
                  sort: o.sort
                }
                options.push(opt);
              })
              let item = {
                questionid: element.questionid,
                status: false,
                questionlabe: element.questionlabe,
                questiontype: element.questiontype,//0为单选；1为多选
                sort: element.sort,
                questionurl: element.questionurl,
                option_list: options
              }
              arr.push(item);
            });
          } else {
            s.$Message['error'](data.msg || data.getmsg);
          }
          s.questionForm.questionList = arr;
        }
      })
    },
    showAddQuestion () {
      let length = this.questionForm.questionList.length;
      this.formObj = {
        questionid: 0,
        status: true,
        questionlabe: '',
        questiontype: 0,//0为单选；1为多选
        sort: length > 0 ? this.questionForm.questionList[length - 1].sort + 1 : 1,
        questionurl: '',
        option_list: [{
          optionsid: 0,
          options: '',
          optionsurl: '',
          sort: 0
        }]
      }
      this.questionForm.questionList.push(this.formObj);
    },
    editQuestion (item, index) {//编辑问题
      this.show = !this.show;
      this.questionForm.questionList[index].status = this.show;
    },
    removeQuestion (index, item) {//删除问题
      if (item.questionid && item.questionid != 0) {
        let s = this;
        zmitiUtil.ajax({
          remark: 'delQuestion',
          data: {
            action: this.inquireActions.delQuestion.action,
            bi: {
              productid: s.productid,
              companyid: s.company.companyid
            },
            list: [item.questionid]
          },
          success (data) {
            data.getret !== 0 && s.$Message.error(data.msg || data.getmsg);
            data.getret === 0 && s.questionForm.questionList.splice(index, 1);
          }
        })
      } else {
        this.questionForm.questionList.splice(index, 1);
      }
    },
    removeOptions (id, index, o) {//移除选项
      if (id && id != 0) {
        let s = this;
        zmitiUtil.ajax({
          remark: 'delOptions',
          data: {
            action: this.inquireActions.delOptions.action,
            info: {
              optionsid:id,
              productid: s.productid,
              companyid: s.company.companyid
            }
          },
          success (data) {
            data.getret !== 0 && s.$Message.error(data.msg || data.getmsg);
            data.getret === 0 && s.questionForm.questionList[index].option_list.splice(o, 1);
          }
        })
      } else {        
        this.questionForm.questionList[index].option_list.splice(o, 1);
      }
    },
    addOptions (index, o) {//添加选项
      this.questionForm.questionList[index].option_list.push({
        optionsid: 0,
        options: '',
        optionsurl: '',
        sort: o + 1
      })
    },
    /**以下为选择配图**/
    chooseQuestionImg (item) {
      this.showPicture = true;
      this.currentQuestion = item;
    },
    onFinishPicture (item) {
      this.currentChoosePicture = item;
    },
    choosePicture () {
      this.showPicture = false;
      this.currentQuestion.questionurl = this.currentChoosePicture.filepath;
    },
    openUploadImg (item, o) {
      this.currentQuestion = item;
      this.currentOptionIndex = o;
      this.showSubimg = true;
    },
    onFinishSubimg (item) {
      this.currentChooseSubimg = item;
    },
    chooseSubimg () {
      this.showSubimg = false;
      let currentOptionIndex = this.currentOptionIndex;
      let filepath = this.currentChooseSubimg.filepath;
      this.currentQuestion.option_list[currentOptionIndex].optionsurl = filepath;
    },
  }
}
</script>
 