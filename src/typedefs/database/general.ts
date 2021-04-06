import UserManager from "../../database/managers/UserManager";
import GuildManager from "../../database/managers/GuildManager";
import ChannelManager from "../../database/managers/ChannelManager";


export type Identifier = string

export type MinimalData = {
  id: Identifier
  createdAt: string
}

export type MinimalDataCreate = Partial<Omit<MinimalData, "id" | "createdAt">>

export type MinimalDataUpdate = Partial<Omit<MinimalData, "id" | "createdAt">>