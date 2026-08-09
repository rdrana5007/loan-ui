import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { DashboardParams } from "@/types";

const client = new Client();
const localCookie = new CookiePersistence();

export default class DashboardService {
  private getAuthHeaders() {
    const token = localCookie.getItem("access_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getDashboardSummary(params?: DashboardParams) {
    return client.api({
      method: "GET",
      url: "dashboard/summary",
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getDashboardStatusSummary(params?: DashboardParams) {
    return client.api({
      method: "GET",
      url: "dashboard/status-summary",
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getDashboardExpenseIncomeSummary() {
    return client.api({
      method: "GET",
      url: "dashboard/expense-income-summary",
      headers: this.getAuthHeaders(),
    });
  }
}
