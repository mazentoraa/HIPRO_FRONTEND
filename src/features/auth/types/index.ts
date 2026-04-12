export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
