<template>
  <Transition name="fade" mode="out-in">
    <component :is="layout">
      <div class="loading">loading...</div>
    </component>
  </Transition>
</template>

<script lang="ts" setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { shallowRef, watchEffect, type Component } from 'vue'
import { useSessionState } from './states/session'

const layout = shallowRef<Component>()
const sessionState = useSessionState()

watchEffect(() => {
  layout.value = sessionState.ready ? MainLayout : AuthLayout
})
</script>
