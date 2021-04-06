import { Identifier, MinimalData } from "./general";

export interface GuildInterface extends MinimalData {
  name: string
  id: Identifier
  owner: Identifier
}

export type GuildDatabaseCreate = Omit<GuildInterface, "id" | "createdAt">
export type GuildDatabaseUpdate = Partial<Omit<GuildInterface, "createdAt" | "id">>
