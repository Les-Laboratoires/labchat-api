import { Identifier, MinimalData } from "./general";

export interface MessageInterface extends MinimalData {
    content: string;
    author: Identifier;
}

export type MessageDatabaseCreate = Omit<MessageInterface, "id" | "createdAt">
export type MessageDatabaseUpdate = Partial<Omit<MessageInterface, "createdAt" | "id">>
