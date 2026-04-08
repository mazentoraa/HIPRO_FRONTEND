import apiClient from "@/lib/api-client";
import { IClient } from "../types/client";
import { PaginatedResponse } from "@/types/api";

const MOCK_CLIENTS: IClient[] = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    phone: "+33 6 12 34 56 78",
    email: "john.doe@example.com",
    is_minor: false,
    is_deleted: false,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    age: 35,
    payment_status: "Payé",
    date_of_birth: "1989-05-12",
    gender: "Masculin",
    blood_type: "O+",
    program: "Swim",
    attendance: 85,
    first_parent_name: null,
    first_parent_phone: null,
    first_parent_email: null,
    second_parent_name: null,
    second_parent_phone: null,
    second_parent_email: null,
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    phone: "+33 6 98 76 54 32",
    email: "jane.smith@example.com",
    is_minor: false,
    is_deleted: false,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    age: 28,
    payment_status: "En retard",
    date_of_birth: "1996-11-24",
    gender: "Féminin",
    blood_type: "A-",
    program: "Yoga",
    attendance: 42,
    first_parent_name: null,
    first_parent_phone: null,
    first_parent_email: null,
    second_parent_name: null,
    second_parent_phone: null,
    second_parent_email: null,
  },
  {
    id: 3,
    first_name: "Sarah",
    last_name: "Johnson",
    phone: "+33 6 11 22 33 44",
    email: "sarah.j@example.com",
    is_minor: true,
    is_deleted: false,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    age: 12,
    payment_status: "Payé",
    date_of_birth: "2012-03-15",
    gender: "Féminin",
    blood_type: "A+",
    program: "Mathematics",
    attendance: 98,
    first_parent_name: "Emily Johnson",
    first_parent_relation: "Mère",
    first_parent_phone: "+33 6 55 44 33 22",
    first_parent_email: "emily.j@example.com",
    second_parent_name: "Mark Johnson",
    second_parent_relation: "Père",
    second_parent_phone: "+33 6 11 11 11 11",
    second_parent_email: "mark.j@example.com",
  }
];

const MOCK_DELETED_CLIENTS: IClient[] = [
  {
    id: 4,
    first_name: "Bob",
    last_name: "Williams",
    phone: "+33 6 99 88 77 66",
    email: "bob.w@example.com",
    is_minor: false,
    is_deleted: true,
    deleted_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    age: 42,
    payment_status: "Annulé",
    program: "None",
    attendance: 0,
    first_parent_name: null,
    first_parent_phone: null,
    first_parent_email: null,
    second_parent_name: null,
    second_parent_phone: null,
    second_parent_email: null,
  }
];


export const clientService = {
  /**
   * Fetch active clients with optional search and pagination.
   */
  async getClients(search?: string, page?: number): Promise<PaginatedResponse<IClient>> {
    // const params = new URLSearchParams();
    // if (search) params.append("search", search);
    // if (page) params.append("page", page.toString());
    // 
    // const { data } = await apiClient.get<PaginatedResponse<IClient>>("/clients/", { params });
    // return data;

    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredClients = [...MOCK_CLIENTS];
    if (search) {
      const searchLower = search.toLowerCase();
      filteredClients = filteredClients.filter(c =>
        c.first_name.toLowerCase().includes(searchLower) ||
        c.last_name.toLowerCase().includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower)
      );
    }

    // Simulate pagination for mock data
    const itemsPerPage = 10;
    const currentPage = page || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

    return {
      count: filteredClients.length,
      next: null,
      previous: null,
      results: paginatedClients
    };
  },

  /**
   * Fetch soft-deleted clients with optional search and pagination (Trash bin).
   */
  async getDeletedClients(search?: string, page?: number): Promise<PaginatedResponse<IClient>> {
    // const params = new URLSearchParams();
    // if (search) params.append("search", search);
    // if (page) params.append("page", page.toString());
    // 
    // const { data } = await apiClient.get<PaginatedResponse<IClient>>("/clients/deleted/", { params });
    // return data;

    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredClients = [...MOCK_DELETED_CLIENTS];
    if (search) {
      const searchLower = search.toLowerCase();
      filteredClients = filteredClients.filter(c =>
        c.first_name.toLowerCase().includes(searchLower) ||
        c.last_name.toLowerCase().includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower)
      );
    }

    return {
      count: filteredClients.length,
      next: null,
      previous: null,
      results: filteredClients
    };
  },

  /**
   * Fetch a single client by ID.
   */
  async getClient(id: number): Promise<IClient> {
    // const { data } = await apiClient.get<IClient>(`/clients/${id}/`);
    // return data;

    await new Promise(resolve => setTimeout(resolve, 300));
    const allClients = [...MOCK_CLIENTS, ...MOCK_DELETED_CLIENTS];
    const client = allClients.find(c => c.id === id);

    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  },

  /**
   * Create a new client.
   */
  async createClient(clientData: Partial<IClient>): Promise<IClient> {
    // const { data } = await apiClient.post<IClient>("/clients/", clientData);
    // return data;

    await new Promise(resolve => setTimeout(resolve, 500));

    const newClient: IClient = {
      ...(clientData as IClient),
      id: Math.max(...MOCK_CLIENTS.map(c => c.id), 0) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_deleted: false,
      deleted_at: null,
    };

    MOCK_CLIENTS.push(newClient);
    return newClient;
  },

  /**
   * Update an existing client (Partial or Full update).
   */
  async updateClient(id: number, clientData: Partial<IClient>): Promise<IClient> {
    // const { data } = await apiClient.patch<IClient>(`/clients/${id}/`, clientData);
    // return data;

    await new Promise(resolve => setTimeout(resolve, 500));

    const index = MOCK_CLIENTS.findIndex(c => c.id === id);
    if (index !== -1) {
      MOCK_CLIENTS[index] = { ...MOCK_CLIENTS[index], ...clientData, updated_at: new Date().toISOString() };
      return MOCK_CLIENTS[index];
    }

    throw new Error("Client not found");
  },

  /**
   * Soft-delete a client.
   */
  async deleteClient(id: number): Promise<void> {
    // await apiClient.delete(`/clients/${id}/`);

    await new Promise(resolve => setTimeout(resolve, 500));

    const index = MOCK_CLIENTS.findIndex(c => c.id === id);
    if (index !== -1) {
      const client = MOCK_CLIENTS[index];
      client.is_deleted = true;
      client.deleted_at = new Date().toISOString();
      client.updated_at = new Date().toISOString();

      MOCK_CLIENTS.splice(index, 1);
      MOCK_DELETED_CLIENTS.push(client);
    }
  },

  /**
   * Restore a soft-deleted client.
   */
  async restoreClient(id: number): Promise<IClient> {
    // const { data } = await apiClient.post<IClient>(`/clients/${id}/restore/`);
    // return data;

    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_DELETED_CLIENTS.findIndex(c => c.id === id);

    if (index !== -1) {
      const client = MOCK_DELETED_CLIENTS[index];
      client.is_deleted = false;
      client.deleted_at = null;
      client.updated_at = new Date().toISOString();

      MOCK_DELETED_CLIENTS.splice(index, 1);
      MOCK_CLIENTS.push(client);
      return client;
    }
    throw new Error("Client not found in trash");
  },
};
