export type GetAppointmentsListResponse = {
  add : {
    id: number;
    startTime: string;
    endTime: string;
    type: {
      id: number,
      name: string
    },
    patient: {
      id: number,
      name: string,
      surname: string
    },
    doctor: {
      id: number,
      name: string,
      surname: string
    },
    category: {
      id: number,
      title: string
    }
  }[],
  delete: number[]
}