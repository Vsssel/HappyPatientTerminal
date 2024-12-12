export type PostConfirmationCodeResponse = {
  status: number
  data: {
    detail: string
  }
}

export type PutConfirmationCodeRequest = {
  method: string,
  confirmationCode: number
}

export type PutConfirmationCodeResponse = {
  status: number
  data: {
    detail: string
  }
}

export type GetTerminalAppointmentResponse = {
  status: number;
  data: {
    id: number,
    date: string,
    index: number,
    startTime: string,
    endTime: string,
    price: number,
    type: {
      id: number,
      name: string
    },
    category: {
      id: number,
      title: string
    },
    room: {
      id: number,
      building_id: number,
      address: string,
      title: string
    },
    doctor: {
      id: number,
      name: string,
      surname: string,
      avatarUrl: string
    },
    patient: {
      id: number,
      name: string,
      surname: string
    }
  }
}