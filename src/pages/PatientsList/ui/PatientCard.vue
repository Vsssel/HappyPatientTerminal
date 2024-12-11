<template>
  <div class="d-flex bg-primary p-3 rounded flex-column gap-2" style="width: 13vw;">
    <div class="d-flex flex-column gap-2">
      <span class="fs-2 text-white fw-bold text-start">
        {{ props.appointment.patient.name }} {{ props.appointment.patient.surname }}
      </span>
      <span class="fs-4 text-white text-start"> 
        for {{ appointment.doctor.name }} {{ appointment.doctor.surname }}
      </span>
    </div>
    <div class="d-flex flex-row gap-2">
      <div class="d-flex align-items-center justify-content-center flex-row gap-2">
        <i class="pi pi-clock text-white"/>
        <span class="fs-5 fw-medium text-white">
          {{ props.appointment.startTime.split(':')[0] }}:{{ props.appointment.startTime.split(':')[1] }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { GetAppointmentsListResponse } from '../types/api';

const props = defineProps<{
  appointment: GetAppointmentsListResponse['add'][0]
}>()
</script>
<style scoped>
.box-shadow{
  box-shadow:  0px 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.2) !important;
}
</style>
