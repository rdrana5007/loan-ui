import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { LoanListParams, LoanPayload } from "@/types";

const client = new Client();
const localCookie = new CookiePersistence();

export default class LoanService {
  private getAuthHeaders() {
    const token = localCookie.getItem("access_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getLoans(params?: LoanListParams) {
    return client.api({
      method: "GET",
      url: "/loans",
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getLoan(id: number) {
    return client.api({
      method: "GET",
      url: `/loans/${id}`,
      headers: this.getAuthHeaders(),
    });
  }

  createLoan(payload: LoanPayload) {
    return client.api({
      method: "POST",
      url: "/loans",
      headers: this.getAuthHeaders(),
      data: payload
    });
  }

  updateLoan(id: number, payload: Partial<LoanPayload>) {
    return client.api({
      method: "PATCH",
      url: `/loans/${id}`,
      headers: this.getAuthHeaders(),
      data: payload,
    });
  }

  deleteLoan(id: number) {
    return client.api({
      method: "DELETE",
      url: `/loans/${id}`,
      headers: this.getAuthHeaders(),
    });
  }
}