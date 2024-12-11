<template>
  <div class="w-100" style="height: 100vh;">
    <router-view />
    <Toast />
  </div>
</template>
<script lang="ts" setup>
import Toast from 'primevue/toast'
import me from './shared/stores/UserStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  if(!me.isAuthorized()){
    router.push('/auth')
  }
})
</script>

