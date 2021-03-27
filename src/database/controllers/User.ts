import { Database } from '../Database'
import { Identifier } from '../../typedefs/general'
import { UserInterface, UserDatabaseCreate, UserDatabaseUpdate } from "../../typedefs/User";
import generateIdentifier from "../../utils/generateIdentifier"

export default class User implements UserInterface {
  public static db: Database = Database.getInstance()
  private readonly _id: Identifier;
  private _data: UserInterface

  private constructor(id: Identifier) {
    this._id = id
    this._data = {} as UserInterface
    this._fetch()
  }

  private async _fetch() {
    this._data = await User.getData(this._id)
  }

  static _create(data: UserDatabaseCreate): User {

    const id = generateIdentifier();

    User.db.users.add({
      username: data.username,
      password: data.password,
      createdAt: Date.now().toString(),
      id,
    })

    return new User(id)
  }

  private static getData(id: Identifier): Promise<UserInterface> {
    return User.db.users.get(id)
  }

  static exists(id: Identifier): boolean {
    return true
  }

  static get(id: Identifier): User {
    return new User(id)
  }

  private static delete(id: Identifier): User {
    User.db.users.delete(id)
    return new User(id)
  }

  private static update(id: Identifier, data: UserDatabaseUpdate): User {
    User.db.users.update(id, data)
    return new User(id)
  }

  delete(): User {
    return User.delete(this._id)
  }

  private update(data: UserDatabaseUpdate): User {
    return User.update(this._id, data)
  }

  get username(): string {
    return this._data.username
  }

  set username(username: string) {
    this._data.username = username
    this.update({
      username
    })
  }

  get password(): string {
    return this._data.password
  }

  set password(password) {
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
}