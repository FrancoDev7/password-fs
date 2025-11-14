import { Password } from "@/app/(home)/interfaces/Password.interface";

export const SAMPLE_PASSWORDS: Password[] = [
  {
    id: "1",
    name: "Gmail",
    email: "user@gmail.com",
    password: "Secure123!",
    category: "Email",
    isFavorite: true,
    url: "mail.google.com",
  },
  {
    id: "2",
    name: "GitHub",
    email: "user@github.com",
    password: "DevPass456#",
    category: "Desarrollo",
    isFavorite: true,
    url: "github.com",
  },
  {
    id: "3",
    name: "Netflix",
    email: "user@email.com",
    password: "EntPass789$",
    category: "Entretenimiento",
    isFavorite: false,
    url: "netflix.com",
  },
  {
    id: "4",
    name: "Spotify",
    email: "user@email.com",
    password: "MusicPass012%",
    category: "Entretenimiento",
    isFavorite: false,
    url: "spotify.com",
  },
  {
    id: "5",
    name: "LinkedIn",
    email: "user@linkedin.com",
    password: "WorkPass345^",
    category: "Redes Sociales",
    isFavorite: true,
    url: "linkedin.com",
  },
];
