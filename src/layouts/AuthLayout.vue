<template>
  <a-layout class="h-screen bg-gray-100">
    <a-layout-sider class="!shadow-none"></a-layout-sider>
    <a-layout>
      <a-layout-content class="w-full h-full">
        <router-view name="auth" />
      </a-layout-content>
      <a-layout-footer class="h-10 flex justify-center content-center">
        <a class="text-sm text-gray-300" href="https://beian.miit.gov.cn/" target="blank"
          >ⓒ {{ new Date().getFullYear() }}</a
        >
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { useSessionState } from '@/states/session'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sessionState = useSessionState()

watchEffect(() => {
  sessionState.ready && router.push({ path: '', query: { f: 'auth' }, replace: true })
})
</script>
