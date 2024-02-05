import type { Permission } from '@/types/model'
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'

export const useSessionState = defineStore('session', () => {
  // session is ready
  const ready = ref(false)

  // user profile
  const permissions = ref<Permission[]>([])
  const slugs: ComputedRef<string[]> = computed(() => {
    return permissions.value.map((p: Permission) => p.uuid)
  })

  // check if user has permission
  function can(abilities: string[]): boolean {
    return slugs.value.some((item) => abilities.includes(item))
  }

  // init
  async function init() {
    // fetch user profile
    // fetch permissions
    // fetch settings
    // fetch roles
    ready.value = false
  }

  // logout
  function cleanup() {
    // clear user profile
    // clear permissions
    // clear settings
    // clear roles
    permissions.value = []
    ready.value = false
  }

  return { init, cleanup, can, ready, slugs, permissions }
})
