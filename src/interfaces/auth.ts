export enum IRoles {
  USER = 'user',
  ADMIN = 'admin'
}

export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  roles: IRoles[]
}

export interface ISetCurrentUser {
  user: IAuthUser;
}

export interface AuthState {
  isAuthenticated: boolean,
  user: IAuthUser,
}

export interface ILoginState {
  email: string,
  password: string;
}
