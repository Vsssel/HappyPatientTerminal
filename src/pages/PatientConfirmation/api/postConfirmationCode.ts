import axios from "axios";
import { PostConfirmationCodeResponse } from "../types";
import me from "../../../shared/stores/UserStore";
import { AxiosError } from 'axios';

export const postConfirmationCode = async (id: number): Promise<PostConfirmationCodeResponse> => {
  try {
    const token = me.getToken();

    if (!token) {
      throw new Error("Authorization token is missing.");
    }
    const response = await axios.post(
      `http://64.225.71.203:2222/terminal/appointments/${id}`,
      {},
      {
        headers: {
          "Terminal-Auth": token,
        },
      }
    );

    return response
  }  catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error in postConfirmationCode:", error);
      return { status: 400, data: error.response?.data };
    } else {
      console.error("Unexpected error:", error);
      return { status: 500, data: { detail: 'Unexpected error occurred' }};
    }
  }
}
