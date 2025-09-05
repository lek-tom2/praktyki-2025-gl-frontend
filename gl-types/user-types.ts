export type User = {
  username: string | null;
  profilePicture: string | null;
  theme: string;
  userId: string | number | null;
  email: string | null;
  accountVerified: boolean | null;
  passwordLength: number | null;
  authorities: string | string[] | null;
  accountNonLocked: boolean | null;
  token: string | null;
};
