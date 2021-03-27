import { Identifier, MinimalData } from "./general";

export interface UserInterface extends MinimalData {
  username: string
  password: string
  id: Identifier
  createdAt: string
}

export type UserDatabaseCreate = Omit<UserInterface, "id" | "createdAt">
export type UserDatabaseUpdate = Partial<Omit<UserInterface, "createdAt" | "id">>
