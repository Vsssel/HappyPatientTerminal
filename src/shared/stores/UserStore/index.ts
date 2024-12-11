import { UserData } from "./types"
import { ref } from "vue"

const me = {
  key: 'me',
  data: ref<UserData>(),

  setToken(token: string): void {
    localStorage.setItem('token', token)
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  isAuthorized(): boolean {
    return this.getToken() !== null
  },

  removeToke(): void {
    localStorage.removeItem('token')
  }
}

export default me