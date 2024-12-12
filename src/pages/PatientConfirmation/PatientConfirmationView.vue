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
        <div class="w-100 d-flex flex-row gap-2">
          <button @click="router.back()" class="btn btn-primary d-flex flex-row gap-3 align-items-center justify-content-center w-100 fs-5">
            <i class="pi pi-arrow-left" />
            <span>Back</span>
          </button>
          <button @click="sendCode" class="btn btn-primary d-flex flex-row gap-3 align-items-center justify-content-center w-100 fs-5" :disabled="loading">
          <i v-if="loading" class="pi pi-spin pi-spinner" />
          <span>Send confirmation code</span>
        </button>
        </div>
      </div>

      <div v-else class="d-flex flex-column gap-3">
        <span class="text fs-5">Select payment method:</span>
        <Select :options="paymentMethods" v-model="selectedPaymentMethod"/>
        <span class="text fs-5">Enter Confirmation Code:</span>
        <InputOtp v-model="code" class="align-self-center" />
        <div class="w-100 d-flex flex-row gap-2">
          <button @click="router.back()" class="btn btn-primary d-flex flex-row gap-3 align-items-center justify-content-center w-100 fs-5">
            <i class="pi pi-arrow-left" />
            <span>Back</span>
          </button>
          <button @click="confirmCode"class="btn btn-primary d-flex flex-row gap-3 align-items-center justify-content-center w-100 fs-5" :disabled="loading">
            <i v-if="loading" class="pi pi-spin pi-spinner" />
            <span>Confirm</span>
          </button>
        </div>
      </div>
    </div>

    <Message v-if="res?.status" :severity="res.status">{{ res.message }}</Message>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getTerminalAppointment, getTerminalResources, postConfirmationCode, putConfirmationCode } from './api';
import InputOtp from 'primevue/inputotp';
import Select from 'primevue/select';
import Message from 'primevue/message';
import { GetTerminalAppointmentResponse } from './types';

const route = useRoute();
const router = useRouter();

const id = +route.params.id;
const isSent = ref(false);
const code = ref('');
const paymentMethods = ref<string[]>([]);
const appointment = ref<GetTerminalAppointmentResponse['data']>()
const selectedPaymentMethod = ref<string>();
const res = ref<{ status: 'error' | 'success'; message: string } | null>(null)
const loading = ref<boolean>(false)

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
      setTimeout(() => router.back(), 1200)
    } else if (response.status === 400){
      res.value = { status: 'error', message: response.data.detail };
      setTimeout(() => router.back(), 1200)
    }
  } catch (error) {
    res.value = { status: 'error', message: 'Failed to confirm the code.' };
    console.error(error);
  } finally{
    loading.value = false
  }
};

onBeforeMount(async () => {
  try {
    paymentMethods.value = await getTerminalResources();
    const appointmentResponse = await getTerminalAppointment(id)
    console.log(appointmentResponse)
    appointment.value = appointmentResponse.data;
    if (!appointment.value) {
      res.value = { status: 'error', message: 'No appointment data found.' };
    }
  } catch (error) {
    res.value = { status: 'error', message: 'Failed to fetch appointment data.' };
    console.error(error);
  }
});

</script>

<style>
.card {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04) !important;
}
</style>
