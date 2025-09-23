export type User = {
  username: string | null;
  profilePicture: string | null;
  theme: string;
  userId: string | null;
  email: string | null;
  accountVerified: boolean | null;
  passwordLength: number | null;
  authorities: string | string[] | null;
  accountNonLocked: boolean | null;
  token: string | null;
  languageIso2: string;
  is_active: boolean;
  is_staff: boolean;
  phone_number: string | null;
};
