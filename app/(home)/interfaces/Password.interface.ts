export interface Password {
  id: string;
  name: string;
  email: string;
  password: string;
  category: string;
  isFavorite: boolean;
  url?: string;
}
