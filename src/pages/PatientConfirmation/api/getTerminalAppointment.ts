import axios from "axios";
import { GetTerminalAppointmentResponse } from "../types";
import me from "../../../shared/stores/UserStore";

export const getTerminalAppointment = async (id: number): Promise<GetTerminalAppointmentResponse> => {
  const token = me.getToken();

  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  const response = await axios.get(
    `http://localhost:2222/terminal/appointments/${id}`,
    {
      headers: {
        "Terminal-Auth": token,
      },
    }
  );

  return response
}

