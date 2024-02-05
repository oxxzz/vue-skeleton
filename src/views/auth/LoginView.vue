<template>
  <main class="w-full h-full flex justify-center content-center items-center select-none !pb-10">
    <div class="p-6 w-80 h-auto bg-white rounded-lg relative">
      <div class="login-with absolute right-6 top-8">
        <a-tooltip mini v-if="loginWith == 1" position="left" content="手机登录">
          <icon-iphone
            @click.stop="loginWith = 2"
            class="cursor-pointer"
            theme="outline"
            size="18"
            fill="#333"
          />
        </a-tooltip>
        <a-tooltip mini v-if="loginWith == 2" position="left" content="账号登录">
          <icon-locking-laptop
            @click.stop="loginWith = 1"
            class="cursor-pointer"
            theme="outline"
            size="18"
            fill="#333"
          />
        </a-tooltip>
      </div>
      <h1 class="text-2xl mt-0 font-bold mb-4">登录账号</h1>
      <a-form layout="vertical" :model="form" @submit="signIn" :label="false">
        <a-form-item class="!mb-2" hide-asterisk v-if="loginWith == 1" field="account" required>
          <a-input focus v-model="form.account" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item class="!mb-2" hide-asterisk v-if="loginWith == 1" field="password" required>
          <a-input-password v-model="form.password" placeholder="密码" />
        </a-form-item>
        <a-form-item class="!mb-2" hide-asterisk v-if="loginWith == 2" field="mobile" required>
          <a-input v-model="form.mobile" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item class="!mb-2" hide-asterisk v-if="loginWith == 2" field="code" required>
          <a-input
            :max-length="6"
            v-model="form.code"
            placeholder="验证码"
            allow-clear
            class="!pr-0"
          >
            <template #suffix>
              <a-button
                size="small"
                :disabled="countDown > 0"
                @click.stop="useCounter()"
                type="text"
                class="!text-gray-700"
              >
                {{ countDown == 0 ? '获取验证码' : countDown + '秒' }}
              </a-button>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item class="!mb-2" hide-asterisk field="acceptAgreement">
          <a-switch v-model="form.acceptAgreement" type="round" class="mr-2" size="small" /> 记住我
        </a-form-item>
        <a-form-item>
          <a-button :loading="loading" html-type="submit" type="primary" long>登录</a-button>
        </a-form-item>
        <a-link :hoverable="false" class="!text-sm !text-gray-600">{{
          loginWith == 1 ? '忘记密码？' : '收不到验证码?'
        }}</a-link>
      </a-form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Auth } from '@/apis'
import { onBeforeUnmount, reactive, ref } from 'vue'
import { useRequest } from 'vue-request'

const loginWith = ref(1)
const countDown = ref(0)
const form = reactive({
  account: '',
  password: '',
  mobile: '',
  code: '',
  acceptAgreement: false
})

onBeforeUnmount(() => {
  useCounter(0, 0) // clear interval
})

const { run: signIn, loading } = useRequest(() => Auth.login(form), {
  manual: true,
  onSuccess: (res) => {
    // do something
    console.log(res)
  }
})

const useCounter = (duration: number = 60, tick: number = 1000) => {
  let intervalTimer: ReturnType<typeof setInterval>
  countDown.value = duration
  intervalTimer = setInterval(() => {
    if (countDown.value > 0) {
      countDown.value -= 1
    } else {
      clearInterval(intervalTimer)
      countDown.value = 0
    }
  }, tick)
}
</script>
