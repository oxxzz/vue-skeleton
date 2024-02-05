<template>
  <p>Home</p>
  <pre>
    {{ sessionState }}
  </pre>
</template>

<script lang="ts" setup>
import { useSessionState } from '@/states/session'
const sessionState = useSessionState()
</script>
