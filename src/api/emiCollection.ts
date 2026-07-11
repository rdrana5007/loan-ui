import { EMI_COLLECTION_KEYS } from "@/constants";
import { EmiCollectionService } from "@/services";
import {
  EmiCollectionApiRecord,
  EmiCollectionFormValues,
  EmiCollectionPaginatedResponse,
  ListParams,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const emiCollectionService = new EmiCollectionService();

export const useEmiCollectionsByLoanQuery = (id: number, params?: ListParams) => {
  return useQuery<EmiCollectionPaginatedResponse>({
    queryKey: [...EMI_COLLECTION_KEYS.all, id, JSON.stringify(params)],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await emiCollectionService.getEmiCollectionsByLoan(id, params);
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

export const useEmiCollectionQuery = (id: number) => {
  return useQuery<EmiCollectionApiRecord>({
    queryKey: EMI_COLLECTION_KEYS.detail(id),
    enabled: id !== null,
    queryFn: async () => {
      const response = await emiCollectionService.getEmiCollection(id);
      return response.data?.data;
    },
  });
};

export const useCreateEmiCollectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EmiCollectionFormValues) =>
      emiCollectionService.createEmiCollection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMI_COLLECTION_KEYS.all });
    },
  });
};
