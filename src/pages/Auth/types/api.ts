export type PostAuthRequest = {
  terminalId: number,
  login: string,
  password: string
}

export type PostAuthResponse = {
  status: number,
  data: {
    detail: String
  }
}