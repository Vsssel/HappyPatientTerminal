<template>
  <div class="w-100 h-100 d-flex align-items-center justify-content-center">
    <div class="card gap-2 p-4">
      <span class="fs-2 text-center">Log in to the system</span>
      <div class="d-flex flex-column gap-3">
        <div class="d-flex w-100 flex-column gap-2">
          <span class="fs-5">Login: </span>
          <InputText v-model="login" class="w-100"/>
        </div>
        <div class="d-flex w-100 flex-column gap-2">
          <span class="fs-5">Password: </span>
          <Password v-model="password" input-class="w-100" :feedback="false" toggle-mask/>
        </div>
        <div class="w-100">
          <button type="submit" @click="loginAction" class="btn btn-primary w-100">Log in</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'
import { postAuth } from './api/postAuth'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const login = ref<string>('')
const password = ref<string>('')
const toast = useToast()
const router = useRouter()


const loginAction = async() => {
  const response = await postAuth({terminalId: 1, login: login.value, password: password.value})
  if(response.status < 400) {
    toast.add({severity: 'success', summary: 'Succcess', detail: response.data.detail, life: 4000 })
    router.push('/')
  }else {
    toast.add({severity: 'success', summary: 'Succcess', detail: response.data.detail, life: 4000 })
  }
}
</script>
<style>
.card{
  box-shadow:  0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04) !important;
}

@media (min-width: 1200px) and (max-width: 1499px){
  .card{
    width: 200px;
  }
}

@media (min-width: 1500px) and (max-width: 1799px){
  .card{
    width: 400px;
  }
}

@media (min-width: 1800px){
  .card{
    width: 600px;
  }
}
</style>