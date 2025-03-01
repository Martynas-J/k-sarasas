import { API_URL } from "@/config/config";

export const updateResultData = async (resultData, toRoute, methods = "PATCH")  => {
  const { code} = resultData;
  const response = await fetch(`${API_URL}/api/${toRoute}/${code}`, {
    method: methods,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultData),
  });
  return response;
};


