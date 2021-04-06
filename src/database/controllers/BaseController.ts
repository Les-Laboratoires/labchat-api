import {Identifier, MinimalData} from "../../typedefs/database/general";
import {Database} from "../Database";
import {UserDatabaseUpdate} from "../../typedefs/database/User";
import UserController from "./UserController";

export default class BaseController<T extends MinimalData> {
  protected _data: T
  protected readonly _id: Identifier

  constructor(data: T) {
    this._data = data
    this._id = data.id
  }
}
