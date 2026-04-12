import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientService } from "../services/clientService";
import { IClient } from "../types/client";

export const clientKeys = {
  all: ["clients"] as const,
  lists: () => [...clientKeys.all, "list"] as const,
  list: (search?: string, page?: number) => [...clientKeys.lists(), { search, page }] as const,
  details: () => [...clientKeys.all, "detail"] as const,
  detail: (id: number) => [...clientKeys.details(), id] as const,
  trash: (search?: string, page?: number) => [...clientKeys.all, "trash", { search, page }] as const,
};

export function useClients(search?: string, page?: number) {
  return useQuery({
    queryKey: clientKeys.list(search, page),
    queryFn: () => clientService.getClients(search, page),
  });
}

export function useDeletedClients(search?: string, page?: number) {
  return useQuery({
    queryKey: clientKeys.trash(search, page),
    queryFn: () => clientService.getDeletedClients(search, page),
  });
}

export function useClient(id: number) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientService.getClient(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clientService.createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IClient> }) =>
      clientService.updateClient(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(variables.id) });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clientService.deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      queryClient.invalidateQueries({ queryKey: clientKeys.trash() });
    },
  });
}

export function useRestoreClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clientService.restoreClient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      queryClient.invalidateQueries({ queryKey: clientKeys.trash() });
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(data.id) });
    },
  });
}
