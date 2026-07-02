import { USER_KEYS } from "@/constants";
import { UserService } from "@/services";
import { CollectorPaginatedResponse, ListParams, UserApiRecord, UserFormValues, UserListParams, UserPaginatedResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const userService = new UserService();

export const useUsersQuery = (params?: UserListParams) => {
  return useQuery<UserPaginatedResponse>({
    queryKey: [...USER_KEYS.all, JSON.stringify(params)],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await userService.getUsers(params);
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

export const useCollectorsQuery = (id: number, params?: ListParams) => {
  return useQuery<CollectorPaginatedResponse>({
    queryKey: [...USER_KEYS.collectors, id, JSON.stringify(params)],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await userService.getCollectors(id, params);
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

export const useUserQuery = (id: number) => {
  return useQuery<UserApiRecord>({
    queryKey: USER_KEYS.detail(id),
    enabled: id !== null,
    queryFn: async () => {
      const response = await userService.getUser(id);
      return response.data?.data;
    }
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserFormValues) => userService.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<UserFormValues>;
    }) => userService.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
  });
};