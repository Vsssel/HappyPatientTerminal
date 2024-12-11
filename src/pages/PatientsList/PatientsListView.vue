<template>
  <div class="w-100 pt-4 pb-4 d-flex justify-content-center">
    <div
      class="col-10 gap-4 d-flex flex-row flex-wrap" >
      <RouterLink 
      v-for="appointment in appointments" 
      :key="appointment.id" 
      :to="{
        name: 'PatientsConfirmation',
        params: { 
          id: appointment.id
        },
      }" 
      class="text-decoration-none text-dark">
      <PatientCard :appointment="appointment" />
    </RouterLink>
  </div>
  </div>
</template>

<script setup lang="ts">
import PatientCard from './ui/PatientCard.vue';
import { appointments } from './values/appointments';
import { onMounted, onUnmounted } from 'vue';
import { getAppointmentsList } from './api';

let abortController: AbortController;

onMounted(() => {
  abortController = new AbortController()
  getAppointmentsList(abortController)
});

onUnmounted(() => {
  abortController.abort()
});
</script>
