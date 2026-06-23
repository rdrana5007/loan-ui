import { CUSTOMER_KEYS } from "@/constants";
import { CustomerService } from "@/services";
import { CustomerApiRecord, CustomerFormValues, CustomerListParams, CustomerPaginatedResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const customerService = new CustomerService();

export const useCustomersQuery = (params?: CustomerListParams) => {
  return useQuery<CustomerPaginatedResponse>({
    queryKey: [...CUSTOMER_KEYS.all, JSON.stringify(params)],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await customerService.getCustomers(params);
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

export const useCustomerQuery = (id: number) => {
  return useQuery<CustomerApiRecord>({
    queryKey: CUSTOMER_KEYS.detail(id),
    enabled: id !== null,
    queryFn: async () => {
      const response = await customerService.getCustomer(id);
      return response.data?.data;
    }
  });
};

export const useCreateCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CustomerFormValues) => customerService.createCustomer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.all });
    },
  });
};

export const useUpdateCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<CustomerFormValues>;
    }) => customerService.updateCustomer(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.all });
    },
  });
};

export const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => customerService.deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.all });
    },
  });
};