import axios from "axios"

export const getTerminalResources = async(): Promise<string[]> => {
  const response = await axios.get('http://localhost:2222/terminal/resources')
  return response.data
}