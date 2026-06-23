import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { CustomerFormValues, CustomerListParams } from "@/types";

const client = new Client();
const localCookie = new CookiePersistence();

export default class CustomerService {
  private getAuthHeaders() {
    const token = localCookie.getItem("access_token");
    return {
      "Content-Type": "application/json",
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

  getCustomer(id: number) {
    return client.api({
      method: "GET",
      url: `/customers/${id}`,
      headers: this.getAuthHeaders(),
    });
  }

  createCustomer(payload: CustomerFormValues) {
    return client.api({
      method: "POST",
      url: "/customers",
      headers: this.getAuthHeaders(),
      data: payload
    });
  }

  updateCustomer(id: number, payload: Partial<CustomerFormValues>) {
    return client.api({
      method: "PATCH",
      url: `/customers/${id}`,
      headers: this.getAuthHeaders(),
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