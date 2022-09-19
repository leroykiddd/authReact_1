export type AuthUserResponseType = {
  token: string;
  user: { id: number };
};

export type LoginUserRequestType = {
  password: string;
  email: string;
};

export type RegistrationUserRequestType = {
  email: string;
  password: string;
  surname: string;
  firstname: string;
  patronymic: string;
  secret_key: string;
};
