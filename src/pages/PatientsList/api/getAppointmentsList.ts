import { AxiosError } from "axios";
import me from "../../../shared/stores/UserStore";
import { GetAppointmentsListResponse } from "../types/api";
import { appointments } from "../values/appointments";

export const getAppointmentsList = async (abortController: AbortController) => {
  try {
    const token = me.getToken();
    if (!token) {
      console.error("User token is missing.");
      return;
    }

    const response = await fetch("http://localhost:2222/terminal/appointments", {
      method: "GET",
      headers: {
        "Terminal-Auth": token
      },
      signal: abortController.signal
    });

    if (!response.ok) {
      console.error("Failed to connect to stream. Status:", response.status);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      console.error("Failed to read response body.");
      return;
    }

    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      console.log("Received chunk:", chunk);

      chunk
        .split("\n")
        .filter((line) => line.trim() !== "")
        .forEach((line) => {
          try {
            const jsonData: GetAppointmentsListResponse = JSON.parse(line);
            processAppointments(jsonData);
          } catch (error) {
            console.error("Error parsing JSON:", error, "Line:", line);
          }
        });
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error in postConfirmationCode:", error);
      return { status: 400, data: error.response?.data };
    } else {
      console.error("Unexpected error:", error);
      return { status: 500, data: 'Unexpected error occurred' };
    }
  }
};


const processAppointments = (jsonData: GetAppointmentsListResponse) => {
  try {
    const currentIds = new Set(appointments.value.map((app) => app.id));

    jsonData.add.forEach((newAppointment) => {
      if (!currentIds.has(newAppointment.id)) {
        appointments.value.push(newAppointment);
        currentIds.add(newAppointment.id);
      }
    });

    jsonData.delete.forEach((idToDelete) => {
      const index = appointments.value.findIndex((app) => app.id === idToDelete);
      if (index !== -1) {
        appointments.value.splice(index, 1);
      }
    });

    console.log("Appointments updated. Current list:", appointments.value);
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

