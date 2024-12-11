import axios, { AxiosError } from "axios";
import { PutConfirmationCodeRequest, PutConfirmationCodeResponse } from "../types";
import me from "../../../shared/stores/UserStore";

export const putConfirmationCode = async (id: number, body: PutConfirmationCodeRequest): Promise<PutConfirmationCodeResponse> => {
  try {
    const token = me.getToken();

    if (!token) {
      throw new Error("Authorization token is missing.");
    }
    const response = await axios.put(
      `http://localhost:2222/terminal/appointments/${id}`,
      body,
      {
        headers: {
          "Terminal-Auth": token,
        },
      }
    );

    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error in postConfirmationCode:", error);
      return { status: 400, data: error.response?.data };
    } else {
      console.error("Unexpected error:", error);
      return { status: 500, data: { detail: 'Unexpected error occurred' }};
    }
  }
};
