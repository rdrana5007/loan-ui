import { LOGIN_KEY } from "@/constants";
import { AuthService } from "@/services";
import { LoginPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: LOGIN_KEY,
    mutationFn: (data: LoginPayload) => new AuthService().login(data),
  });
};