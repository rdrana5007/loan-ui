import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { CustomerListParams, ListParams } from "@/types";

const client = new Client();
const localCookie = new CookiePersistence();

export default class CustomerService {
  private getAuthHeaders(isFormData = false) {
    const token = localCookie.getItem("access_token");
    return {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
    };
  }

  getCustomers(params?: CustomerListParams) {
    return client.api({
      method: "GET",
      url: "/customers",
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getCustomerCodes(id: number, params?: ListParams) {
    return client.api({
      method: "GET",
      url: `/customers/${id}/codes`,
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getCustomer(id: number) {
    return client.api({
      method: "GET",
      url: `/customers/${id}`,
      headers: this.getAuthHeaders(),
    });
  }

  createCustomer(payload: FormData) {
    return client.api({
      method: "POST",
      url: "/customers",
      headers: this.getAuthHeaders(true),
      data: payload
    });
  }

  updateCustomer(id: number, payload: FormData) {
    return client.api({
      method: "PATCH",
      url: `/customers/${id}`,
      headers: this.getAuthHeaders(true),
      data: payload,
    });
  }

  deleteCustomer(id: number) {
    return client.api({
      method: "DELETE",
      url: `/customers/${id}`,
      headers: this.getAuthHeaders(),
    });
  }
}