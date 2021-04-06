import { GuildInterface, GuildDatabaseUpdate } from "../../typedefs/database/Guild";
import BaseManager from "./BaseManager";
import {Identifier} from "../../typedefs/database/general";
import BaseController from "../controllers/BaseController";
import GuildController from "../controllers/GuildController";

export default class GuildManager extends BaseManager<GuildInterface, GuildDatabaseUpdate, GuildController> {
  constructor() {
    super("guilds", GuildController)
  }

}