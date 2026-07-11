import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { EmiCollectionFormValues, ListParams } from "@/types";

const client = new Client();
const localCookie = new CookiePersistence();

export default class EmiCollectionService {
  private getAuthHeaders() {
    const token = localCookie.getItem("access_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getEmiCollectionsByLoan(id: number, params?: ListParams) {
    return client.api({
      method: "GET",
      url: `/emi-collections/loans/${id}`,
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getEmiCollection(id: number) {
    return client.api({
      method: "GET",
      url: `/emi-collections/${id}`,
      headers: this.getAuthHeaders(),
    });
  }

  createEmiCollection(payload: EmiCollectionFormValues) {
    return client.api({
      method: "POST",
      url: "/emi-collections",
      headers: this.getAuthHeaders(),
      data: payload,
    });
  }
}
