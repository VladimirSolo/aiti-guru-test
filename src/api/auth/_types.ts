export type Request = {
  username: string;
  password: string;
}

export type Response = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
