import axios from "axios"
import { PostAuthRequest, PostAuthResponse } from "../types"
import me from "../../../shared/stores/UserStore"

export const postAuth = async(body: PostAuthRequest): Promise<PostAuthResponse> => {
  const response = await axios.post('http://localhost:2222/terminal/auth', body)
  response.status < 400 && me.setToken(response.headers['terminal-auth'])
  return response
}