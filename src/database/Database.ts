import * as arangojs from "arangojs";
import UserManager from "./managers/UserManager";
import GuildManager from "./managers/GuildManager";
import BaseManager from "./managers/BaseManager";
export class Database {
  private static instance: Database;

  private constructor(
    public readonly users: UserManager = new UserManager(),
    public readonly guilds: GuildManager = new GuildManager(),
    public readonly db: arangojs.Database = new arangojs.Database()
  ) {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
      return Database.getInstance();
    } else {
      return Database.instance;
    }
  }
}
