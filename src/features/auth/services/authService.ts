import { IUser, ILoginResponse } from '../types';

export async function mockLogin(username: string, password?: string): Promise<ILoginResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!username) {
    throw new Error("Le nom d'utilisateur est requis");
  }

  // Mock checking credentials (any will do for the mock)
  const user: IUser = {
    id: "1",
    name: username,
    email: `${username}@torazen.com`,
    role: "admin",
  };

  return {
    user,
    token: 'mock-jwt-token',
  };
}

export async function mockLogout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
}
