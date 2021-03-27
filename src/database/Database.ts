import * as arangojs from "arangojs"
import { Identifier, MinimalData } from "../typedefs/general"
import { UserInterface, UserDatabaseUpdate } from "../typedefs/User";
import {DocumentCollection, EdgeCollection} from "arangojs/collection";


export class Database {
  private static instance: Database
  public readonly users: UserManager
  public readonly db: arangojs.Database
  private constructor() {
    this.users = new UserManager()
    this.db = new arangojs.Database()
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
      return Database.getInstance()
    } else {
      return Database.instance
    }
  }
}

export class BaseManager {
  private readonly collectionName: string
  private readonly database: Database
  private readonly collection: DocumentCollection<any> & EdgeCollection<any>
  constructor(collectionName: string) {
    this.collectionName = collectionName
    this.database = Database.getInstance()
    this.collection = this.database.db.collection<any>(collectionName)
  }

  async add(data: MinimalData) {
    await this.collection.save(data)
    return data
  }

  get(id: Identifier) {
    return this.database.db.query(arangojs.aql`FOR entry IN ${this.collection} FILTER entry.id === ${id} RETURN entry`).then(c=>c.all().then(r=>r?.[0]))
  }

  delete(id: Identifier) {
    return this.database.db.query(arangojs.aql`FOR entry IN ${this.collection} FILTER entry.id === ${id} REMOVE entry IN ${id} RETURN entry`).then(c=>c.all().then(r=>r?.[0]))
  }

  update(id: Identifier, data: MinimalData) {
    return this.database.db.query(arangojs.aql`FOR entry IN ${this.collection} FILTER entry.id === ${id} UPDATE ${data} IN ${this.collection} RETURN entry`).then(c=>c.all().then(r=>r?.[0]))
  }
}

export class UserManager extends BaseManager {
  constructor() {
    super("user")
  }

  add(data: UserInterface): Promise<UserInterface> {
    return super.add(data)
  }

  update(id: Identifier, data: UserDatabaseUpdate): Promise<UserInterface> {
    return super.update(id, data)
  }
}