import apiClient from "@/lib/api-client";
import { IClient } from "../types/client";
import { PaginatedResponse } from "@/types/api";

export const clientService = {
  /**
   * Fetch active clients with optional search and pagination.
   */
  async getClients(search?: string, page?: number): Promise<PaginatedResponse<IClient>> {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page) params.append("page", page.toString());
    
    const { data } = await apiClient.get<PaginatedResponse<IClient>>("/clients/", { params });
    return data;
  },

  /**
   * Fetch soft-deleted clients with optional search and pagination (Trash bin).
   */
  async getDeletedClients(search?: string, page?: number): Promise<PaginatedResponse<IClient>> {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page) params.append("page", page.toString());
    
    const { data } = await apiClient.get<PaginatedResponse<IClient>>("/clients/deleted/", { params });
    return data;
  },

  /**
   * Fetch a single client by ID.
   */
  async getClient(id: number): Promise<IClient> {
    const { data } = await apiClient.get<IClient>(`/clients/${id}/`);
    return data;
  },

  /**
   * Create a new client.
   */
  async createClient(clientData: Partial<IClient>): Promise<IClient> {
    const { data } = await apiClient.post<IClient>("/clients/", clientData);
    return data;
  },

  /**
   * Update an existing client (Partial or Full update).
   */
  async updateClient(id: number, clientData: Partial<IClient>): Promise<IClient> {
    const { data } = await apiClient.patch<IClient>(`/clients/${id}/`, clientData);
    return data;
  },

  /**
   * Soft-delete a client.
   */
  async deleteClient(id: number): Promise<void> {
    await apiClient.delete(`/clients/${id}/`);
  },

  /**
   * Restore a soft-deleted client.
   */
  async restoreClient(id: number): Promise<IClient> {
    const { data } = await apiClient.post<IClient>(`/clients/${id}/restore/`);
    return data;
  },
};
