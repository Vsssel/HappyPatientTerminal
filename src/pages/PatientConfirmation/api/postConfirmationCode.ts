import axios from "axios";
import { PostConfirmationCodeResponse } from "../types";
import me from "../../../shared/stores/UserStore";

export const postConfirmationCode = async (id: number): Promise<PostConfirmationCodeResponse> => {
  try {
    const token = me.getToken();

    if (!token) {
      throw new Error("Authorization token is missing.");
    }
    const response = await axios.post(
      `http://localhost:2222/terminal/appointments/${id}`,
      {},
      {
        headers: {
          "Terminal-Auth": token,
        },
      }
    );

    return response
  } catch (error) {
    console.error("Error in postConfirmationCode:", error)
    return {status: 400, data: error.response.data }
  }
}
