import {ChannelDatabaseUpdate, ChannelInterface} from "../../typedefs/database/Channel";
import BaseManager from "./BaseManager";
import ChannelController from "../controllers/ChannelController";

export default class ChannelManager extends BaseManager<ChannelInterface, ChannelDatabaseUpdate, ChannelController> {
  constructor() {
    super("channels", ChannelController)
  }
}