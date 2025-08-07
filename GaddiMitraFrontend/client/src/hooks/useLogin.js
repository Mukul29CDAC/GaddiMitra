
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useLogin() {
  return useMutation({
    mutationFn: async (loginData) => {
    const response = await axios.post(
  "http://localhost:8080/user/login",
  loginData,
  { withCredentials: true }
);
    
      return response.data;
    },
  });
}
