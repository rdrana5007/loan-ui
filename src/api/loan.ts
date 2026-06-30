import { LOAN_KEYS } from "@/constants";
import { LoanService } from "@/services";
import { LoanApiRecord, LoanListParams, LoanPaginatedResponse, LoanPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const loanService = new LoanService();

export const useLoansQuery = (params?: LoanListParams) => {
  return useQuery<LoanPaginatedResponse>({
    queryKey: [...LOAN_KEYS.all, JSON.stringify(params)],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await loanService.getLoans(params);
      const payload = response.data?.data;
      const totalCount = payload.page_info.total_count ?? payload.items.length;

      if (Array.isArray(payload)) {
        const perPage = params?.pageSize ?? totalCount;
        const page = params?.page ?? 1;
        return {
          data: payload,
          meta: {
            current_page: page,
            per_page: perPage,
            total: totalCount,
          },
        };
      }

      return payload;
    },
  });
};

export const useLoanQuery = (id: number) => {
  return useQuery<LoanApiRecord>({
    queryKey: LOAN_KEYS.detail(id),
    enabled: id !== null,
    queryFn: async () => {
      const response = await loanService.getLoan(id);
      return response.data?.data;
    }
  });
};

export const useCreateLoanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoanPayload) => loanService.createLoan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LOAN_KEYS.all });
    },
  });
};

export const useUpdateLoanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<LoanPayload>;
    }) => loanService.updateLoan(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LOAN_KEYS.all });
    },
  });
};

export const useDeleteLoanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => loanService.deleteLoan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LOAN_KEYS.all });
    },
  });
};