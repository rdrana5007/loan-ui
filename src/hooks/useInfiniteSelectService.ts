"use client";
import { CustomerService, UserService } from "@/services";
import { useInfiniteSelectData } from "./useInfiniteSelectData";
import { CustomerApiRecord, SelectOption, UserApiRecord } from "@/types";
import { LOAN_KEYS } from "@/constants";

const mapUserOption = (user: UserApiRecord): SelectOption => ({
  id: Number(user.id),
  label: user.fullName?.trim(),
  value: Number(user.id),
});

const mapCustomerOption = (customer: CustomerApiRecord): SelectOption => ({
  id: Number(customer.id),
  label: customer.customerCode?.trim(),
  value: Number(customer.id),
});

const userService = new UserService();
const customerService = new CustomerService();

export const useInfiniteSelectService = () => {
  const collectors = useInfiniteSelectData<UserApiRecord>({
    queryKey: LOAN_KEYS.collectors,
    service: (params) =>
      userService.getUsers({
        ...params,
        isCollector: true,
      }),
    mapToOption: mapUserOption,
  });

  const customers = useInfiniteSelectData<CustomerApiRecord>({
    queryKey: LOAN_KEYS.customers,
    service: (params) => customerService.getCustomers(params),
    mapToOption: mapCustomerOption,
  });

  return { collectors, customers };
};
