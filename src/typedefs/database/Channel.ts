import { Identifier, MinimalData } from "./general";

export interface ChannelInterface extends MinimalData {
  name: string
  topic: string
  guild: Identifier
}

export type ChannelDatabaseCreate = Omit<ChannelInterface, "id" | "createdAt">
export type ChannelDatabaseUpdate = Partial<Omit<ChannelInterface, "createdAt" | "id">>
