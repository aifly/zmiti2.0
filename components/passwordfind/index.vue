<template>
  <div class="zmiti-pwdfind">
    <header>
      <div>
        <div class="zmiti-title">
          <img :src="imgs.userLoginTitle" alt />
          <span>v2.0</span>
        </div>
      </div>
      <div>
        <span>单位端控制平台</span>
      </div>
      <div class="login">
        <a href="#/login">去登录></a>
      </div>
    </header>
    <section class="zmiti-pwdfing-main">
      <div class="step-box">
        <div class="item" :class="{active:currentStep==1,pass:currentStep != 1}"></div>
        <div class="item" :class="{active:currentStep==1,pass:currentStep != 1}">
          <div>1</div>
          <div>验证身份</div>
        </div>
        <div class="item" :class="{active:currentStep==1,pass:currentStep != 1}"></div>
        <div
          class="item"
          :class="{active:(currentStep==1 || currentStep==2),pass:currentStep == 3}"
        ></div>
        <div class="item" :class="{active:currentStep==2,pass:currentStep == 3}">
          <div>2</div>
          <div>重置登录密码</div>
        </div>
        <div class="item" :class="{active:currentStep==2,pass:currentStep ==3}"></div>
        <div class="item" :class="{active:(currentStep==2 || currentStep==3)}"></div>
        <div class="item" :class="{active:currentStep==3}">
          <div>✓</div>
          <div>完成</div>
        </div>
        <div class="item" :class="{active:currentStep==3}"></div>
        <div class="item" :class="{active:currentStep==3}"></div>
      </div>
      <div class="validate-box" v-show="currentStep == 1">
        <div class="validate-tip">为确认是你本人操作，请选择验证方式完成身份验证：</div>
        <div class="validate-first">
          <div>
            <p>通过邮箱验证</p>
            <span>如果你的邮箱还在正常使用，请选择此方式</span>
          </div>
          <div>
            <Button type="info" @click="goValidateStepOne">立即验证</Button>
          </div>
        </div>
        <div class="validate-second">
          <div>
            <p>拨打客服电话找回</p>
            <span>如果上述验证方式均无法完成，请您拨打客服电话&nbsp;&nbsp;</span>
            <strong>13258779433</strong>
          </div>
        </div>
      </div>
      <div class="zmiti-form" v-show="currentStep == 2">
        <Form :model="formUser" :label-width="100" :rules="ruleValidate" ref="ruleForm">
          <FormItem label="用户名：" prop="username">
            <Input v-model="formUser.username" placeholder="用户名" />
          </FormItem>
          <FormItem label="邮箱：" prop="email">
            <Input v-model="formUser.email" placeholder="邮箱" />
          </FormItem>
          <FormItem label>
        <Button type="primary" @click="goValidate">提交</Button>
          </FormItem>
        </Form>
      </div>
      <div class="zmiti-form-success" v-show="currentStep == 3">
        <div>
          <p><img :src="imgs.success" alt="">重置成功，请牢记新的登录密码</p>
        </div>
        <div>
          <a href="#/login">重新登录&nbsp;>></a>
        </div>
      </div>
      <!-- <div class="bottom-tips">
            <div class="bottom-tips-title">没收到短信验证码？</div>
            <ul class="ui-list">
              <li class="ui-list-item">
                <span class="ui-list-item-text">1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。</span>
              </li>
              <li class="ui-list-item">
                <span class="ui-list-item-text">2、请核实手机是否已欠费停机，或者屏蔽了系统短信。</span>
              </li>
              <li class="ui-list-item">
                <span class="ui-list-item-text">3、如果手机已丢失或停用， 请选择其他验证方式 。</span>
              </li>
              <li class="ui-list-item">
                <span class="ui-list-item-text">4、您也可以尝试将SIM卡移动到另一部手机，然后重试。</span>
              </li>
            </ul>
      </div>-->
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>

<script>
import zmitiUtil from '../../common/lib/util';
var userActions = zmitiUtil.userActions;
import Vue from "vue";
export default {
  props: ['obserable'],
  name: 'zmitiindex',
  data () {
    return {
      imgs: window.imgs,
      viewH: document.documentElement.clientHeight,
      currentStep: 1,
      formUser: {
        username: '',
        email: ''
      },
      ruleValidate: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },{type:'email',message:'请输入正确的邮箱'}],
      }
    }
  },
  mounted () {
    console.log(this.imgs)
  },
  methods: {
    goValidateStepOne () {
      this.currentStep = 2;
    },
    goValidate () {
      this.$refs['ruleForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          var s = this;
          zmitiUtil.ajax({
            remark: 'passwordFind',
            data: {
              action: userActions.passwordFind.action,
              username: this.formUser.username,
              useremail: this.formUser.email,
            },
            success (data) {
              s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg || data.getmsg);
              data.getret === 0 && (s.currentStep = 3);
            }
          })
        }
      })
    }
  },
}
</script>
 