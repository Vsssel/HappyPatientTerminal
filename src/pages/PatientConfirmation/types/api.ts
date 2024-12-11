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