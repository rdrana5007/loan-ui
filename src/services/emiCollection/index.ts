import CookiePersistence from "@/utils/cookiePersistence";
import { Client } from "../apiClient";
import { UserFormValues, UserListParams } from "@/types";

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

  getEmiCollections(params?: UserListParams) {
    return client.api({
      method: "GET",
      url: "/emi-collections",
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

  createEmiCollection(payload: UserFormValues) {
    return client.api({
      method: "POST",
      url: "/emi-collections",
      headers: this.getAuthHeaders(),
      data: payload
    });
  }

//   updateUser(id: number, payload: Partial<UserFormValues>) {
//     return client.api({
//       method: "PATCH",
//       url: `/users/${id}`,
//       headers: this.getAuthHeaders(),
//       data: payload,
//     });
//   }

//   deleteUser(id: number) {
//     return client.api({
//       method: "DELETE",
//       url: `/users/${id}`,
//       headers: this.getAuthHeaders(),
//     });
//   }
}