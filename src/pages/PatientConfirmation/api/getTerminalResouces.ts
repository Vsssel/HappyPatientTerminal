import axios from "axios"

export const getTerminalResources = async(): Promise<string[]> => {
  const response = await axios.get('http://64.225.71.203:2222/terminal/resources')
  return response.data
}