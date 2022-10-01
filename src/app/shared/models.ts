export interface APIUser {
  payload: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

export interface LoginUserData {
  payload: {
    email: string;
    password: string;
  };
}
