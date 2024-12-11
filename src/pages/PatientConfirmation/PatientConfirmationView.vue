<template>
  <div class="w-100 h-100 d-flex flex-column gap-3 align-items-center justify-content-center">
    <div class="card d-flex flex-column gap-3 p-3">
      <div class="d-flex flex-row justify-content-between">
        <span class="fs-4">Patient:</span>
        <span class="fs-4">{{ appointment?.patient?.name }} {{ appointment?.patient?.surname }}</span>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <span class="fs-4">Doctor:</span>
        <span class="fs-4">{{ appointment?.doctor?.name }} {{ appointment?.doctor?.surname }}</span>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <span class="fs-4">Appointment type:</span>
        <span class="fs-4">{{ appointment?.type?.name }}</span>
      </div>

      <div v-if="!isSent" class="d-flex flex-column gap-3">
        <span class="text-info fs-5">
          You should confirm your presence by entering a confirmation code that we will send to your email.
        </span>
        <button @click="sendCode" class="btn btn-primary d-flex flex-row gap-3 align-items-center justify-content-center w-100 fs-5" :disabled="loading">
          <i v-if="loading" class="pi pi-spin pi-spinner" />
          <span>Send confirmation code</span>
        </button>
      </div>

      <div v-else class="d-flex flex-column gap-3">
        <span class="text fs-5">Select payment method:</span>
        <Select :options="paymentMethods" v-model="selectedPaymentMethod"/>
        <span class="text fs-5">Enter Confirmation Code:</span>
        <InputOtp v-model="code" class="align-self-center" />
        <button @click="confirmCode"class="btn btn-primary d-flex flex-row gap-3 align-items-center justify-content-center w-100 fs-5" :disabled="loading">
          <i v-if="loading" class="pi pi-spin pi-spinner" />
          <span>Confirm</span>
        </button>
      </div>
    </div>

    <Message v-if="res?.status" :severity="res.status">{{ res.message }}</Message>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { appointments } from '../PatientsList/values/appointments';
import { getTerminalResources, postConfirmationCode, putConfirmationCode } from './api';
import InputOtp from 'primevue/inputotp';
import Select from 'primevue/select';
import Message from 'primevue/message';

const route = useRoute();
const router = useRouter();

const id = +route.params.id;
const isSent = ref(false);
const code = ref('');
const paymentMethods = ref<string[]>([]);
const selectedPaymentMethod = ref<string>();
const res = ref<{ status: 'error' | 'success'; message: string } | null>(null)
const loading = ref<boolean>(false)
const appointment = appointments.value.find((app) => app.id === id) || null;

const sendCode = async () => {
  try {
    loading.value = true
    const response = await postConfirmationCode(id);
    if (response.status < 400) {
      res.value = { status: 'success', message: response.data.detail };
      isSent.value = true;
    } else {
      res.value = { status: 'error', message: response.data.detail };
    }
  } 
  catch (error) {
    res.value = { status: 'error', message: 'Failed to send confirmation code.' };
    console.error(error);
  }
  finally{
    loading.value = false
  }
};

const confirmCode = async () => {
  try {
    if(!selectedPaymentMethod.value){
      res.value = { status: 'error', message: "Please select payment method" }
      return
    }
    const response = await putConfirmationCode(id, {
      method: selectedPaymentMethod.value,
      confirmationCode: Number(code.value),
    });
    if (response.status < 400) {
      res.value = { status: 'success', message: response.data.detail };
      setTimeout(() => router.back(), 1000)
    } else {
      res.value = { status: 'error', message: response.data.detail };
    }
  } catch (error) {
    res.value = { status: 'error', message: 'Failed to confirm the code.' };
    console.error(error);
  } finally{
    loading.value = false
  }
};

onMounted(async () => {
  try {
    paymentMethods.value = await getTerminalResources();
  } catch (error) {
    res.value = { status: 'error', message: 'Failed to fetch payment methods.' };
    console.error(error);
  }
});
</script>

<style>
.card {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04) !important;
}
</style>
