import { Database } from '../Database'
import {Identifier} from '../../typedefs/database/general'
import {UserDatabaseUpdate, UserInterface} from "../../typedefs/database/User";
import BaseController from "./BaseController"

export default class UserController extends BaseController<UserInterface> implements UserInterface  {
  private readonly db: Database = Database.getInstance()

  constructor(data: UserInterface) {
    super(data)
  }

  delete(): Promise<UserInterface | undefined> {
    return Database.getInstance().users.deleteOne(this._id)
  }

  protected update(data: UserDatabaseUpdate): Promise<UserController | undefined> {
    return Database.getInstance().users.updateOne(this._id, data)
  }

  get username(): string {
    return this._data.username
  }

  setUsername(username: string) {
    this._data.username = username
    this.update({
      username
    })
  }

  get password(): string {
    return this._data.password
  }

  setPassword(password: string) {
    this._data.password = password
    this.update({
      password
    })
  }

  get createdAt(): string {
    return this._data.createdAt
  }

  get id(): Identifier {
    return this._id
  }

  get avatar(): string {
    return ""
  }
}
