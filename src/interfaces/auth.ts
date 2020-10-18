export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
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
