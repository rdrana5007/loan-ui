import { EMICOLLECTION_KEYS } from "@/constants";
import { EmiCollectionService } from "@/services";
import { EmiCollectionListParams, emiCollectionPaginatedResponse, UserApiRecord, UserFormValues, UserListParams, UserPaginatedResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const emiCollectionService = new EmiCollectionService();

export const useEmiCollectionsQuery = (params?: EmiCollectionListParams) => {
  return useQuery<emiCollectionPaginatedResponse>({
    queryKey: [...EMICOLLECTION_KEYS.all, JSON.stringify(params)],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await emiCollectionService.getEmiCollections(params);
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
  return useQuery<UserApiRecord>({
    queryKey: EMICOLLECTION_KEYS.detail(id),
    enabled: id !== null,
    queryFn: async () => {
      const response = await emiCollectionService.getEmiCollection(id);
      return response.data?.data;
    }
  });
};

export const useCreateEmiCollectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserFormValues) => emiCollectionService.createEmiCollection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMICOLLECTION_KEYS.all });
    },
  });
};
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       id,
//       payload,
//     }: {
//       id: number;
//       payload: Partial<UserFormValues>;
//     }) => userService.updateUser(id, payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: EMICOLLECTION_KEYS.all });
//     },
//   });
// };

// export const useDeleteEmiCollectionMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: number) => userService.deleteUser(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: EMICOLLECTION_KEYS.all });
//     },
//   });
// };