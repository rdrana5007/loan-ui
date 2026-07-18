import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { EmiFollowUpListParams, EmiFollowUpPayload } from "@/types";

const client = new Client();
const localCookie = new CookiePersistence();

export default class EmiFollowUpService {
  private getAuthHeaders() {
    const token = localCookie.getItem("access_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getEmiFollowUpsByLoan(id: number, params?: EmiFollowUpListParams) {
    return client.api({
      method: "GET",
      url: `/emi-followups/loans/${id}`,
      headers: this.getAuthHeaders(),
      params,
    });
  }

  createEmiFollowUp(payload: EmiFollowUpPayload) {
    return client.api({
      method: "POST",
      url: "/emi-followups",
      headers: this.getAuthHeaders(),
      data: payload,
    });
  }

  updateEmiFollowUp(id: number, payload: Partial<EmiFollowUpPayload>) {
    return client.api({
      method: "PATCH",
      url: `/emi-followups/${id}`,
      headers: this.getAuthHeaders(),
      data: payload,
    });
  }
}
