export type RegisterPayload = {
  username: string;
  email: string;
  phone: string;
  birthday: string;
  password: string;
  confirmPassword: string;
};

export type LoginResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
};

export type Account = {
  id: string;
  username: string;
  email: string;
};