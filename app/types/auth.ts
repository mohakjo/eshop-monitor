/** Utilisateur renvoyé par l'endpoint d'authentification DummyJSON. */
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
