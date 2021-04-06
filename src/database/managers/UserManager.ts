import {UserDatabaseUpdate, UserInterface} from "../../typedefs/database/User";
import BaseManager from "./BaseManager";
import UserController from "../controllers/UserController";

export default class UserManager extends BaseManager<UserInterface, UserDatabaseUpdate, UserController> {
  constructor() {
    super("users", UserController)
  }
}