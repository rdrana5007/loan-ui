import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { ListParams, UserPayload } from "@/types";

const client = new Client();
const localCookie = new CookiePersistence();

export default class UserService {
  private getAuthHeaders() {
    const token = localCookie.getItem("access_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getUsers(params?: ListParams) {
    return client.api({
      method: "GET",
      url: "/api/users",
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getUser(id: number) {
    return client.api({
      method: "GET",
      url: `/api/users/${id}`,
      headers: this.getAuthHeaders(),
    });
  }

  createUser(payload: UserPayload) {
    return client.api({
      method: "POST",
      url: "/api/users",
      headers: this.getAuthHeaders(),
      data: payload
    });
  }

  updateUser(id: number, payload: Partial<UserPayload>) {
    return client.api({
      method: "PATCH",
      url: `/api/users/${id}`,
      headers: this.getAuthHeaders(),
      data: payload,
    });
  }

  deleteUser(id: number) {
    return client.api({
      method: "DELETE",
      url: `/api/users/${id}`,
      headers: this.getAuthHeaders(),
    });
  }
}