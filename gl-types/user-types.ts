export type Vechicle = {
  brand: string;
  model: string;
  year: string;
  color: string;
  licensePlateNumber: string;
};

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
  vechicles: Vechicle[] | null;
};
