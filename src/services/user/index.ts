import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { ListParams, UserFormValues, UserListParams } from "@/types";

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

  getUsers(params?: UserListParams) {
    return client.api({
      method: "GET",
      url: "/users",
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getCollectors(id: number, params?: ListParams) {
    return client.api({
      method: "GET",
      url: `/users/${id}/collectors`,
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getUser(id: number) {
    return client.api({
      method: "GET",
      url: `/users/${id}`,
      headers: this.getAuthHeaders(),
    });
  }

  createUser(payload: UserFormValues) {
    return client.api({
      method: "POST",
      url: "/users",
      headers: this.getAuthHeaders(),
      data: payload
    });
  }

  updateUser(id: number, payload: Partial<UserFormValues>) {
    return client.api({
      method: "PATCH",
      url: `/users/${id}`,
      headers: this.getAuthHeaders(),
      data: payload,
    });
  }

  deleteUser(id: number) {
    return client.api({
      method: "DELETE",
      url: `/users/${id}`,
      headers: this.getAuthHeaders(),
    });
  }
}