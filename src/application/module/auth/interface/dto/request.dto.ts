export interface SignUpDto {
  name: string;
  email: string;
  password: string;
  createdAt? : Date
}

export interface LoginDto {
  username: string;
  password: string;
}
