import { EMI_FOLLOWUP_KEYS } from "@/constants";
import { EmiFollowUpService } from "@/services";
import {
  EmiFollowUpListParams,
  EmiFollowUpPaginatedResponse,
  EmiFollowUpPayload,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const emiFollowUpService = new EmiFollowUpService();

export const useEmiFollowUpsByLoanQuery = (id: number, params?: EmiFollowUpListParams) => {
  return useQuery<EmiFollowUpPaginatedResponse>({
    queryKey: [...EMI_FOLLOWUP_KEYS.all, id, JSON.stringify(params)],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await emiFollowUpService.getEmiFollowUpsByLoan(id, params);
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

export const useCreateEmiFollowUpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EmiFollowUpPayload) =>
      emiFollowUpService.createEmiFollowUp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMI_FOLLOWUP_KEYS.all });
    },
  });
};

export const useUpdateEmiFollowUpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<EmiFollowUpPayload>;
    }) => emiFollowUpService.updateEmiFollowUp(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMI_FOLLOWUP_KEYS.all });
    },
  });
};