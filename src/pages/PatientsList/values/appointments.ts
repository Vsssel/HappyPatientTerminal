import { ref } from 'vue'
import { GetAppointmentsListResponse } from '../types/api'

export const appointments = ref<GetAppointmentsListResponse['add']>([])