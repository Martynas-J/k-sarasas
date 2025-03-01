import { API_URL } from "@/config/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const saveResult = async (route, data, mutate, text, errorMsg) => {
  try {
    const response = await fetch(`${API_URL}/api/${route}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      if (typeof mutate === "function") {
        mutate && mutate();
      }
      text && toast.success(text);
      return response;
    } else {
      errorMsg && toast.error(errorMsg);
      console.error("Failed to save the result.");
      return response;
    }
  } catch (error) {
    console.error("Error while saving the result:", error);
  }
};
