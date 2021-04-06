import { DocumentCollection, EdgeCollection } from "arangojs/collection";
import * as arangojs from "arangojs";
import { Database } from "../Database";
import {Identifier, MinimalData, MinimalDataUpdate, MinimalDataCreate} from "../../typedefs/database/general";
import Collection from "../../utils/Collection";
import BaseController from '../controllers/BaseController';

export default abstract class BaseManager<
  T extends MinimalData,
  U extends MinimalDataUpdate,
  C extends BaseController<T>
> {
  private readonly database: Database;
  private readonly collection: DocumentCollection<T> & EdgeCollection<T>;
  protected constructor(
    private readonly collectionName: string,
    private readonly controllerConstructor: { new (data: T, name: string): C }
  ) {
    this.database = Database.getInstance();
    this.collection = this.database.db.collection<T>(collectionName);
  }

  async add(data: T): Promise<C> {
    await this.collection.save(data);
    return new this.controllerConstructor(data, this.collectionName);
  }

  async find(id: Identifier): Promise<Collection<Identifier, C>> {
    return new Collection<Identifier, C>(
      await this.database.db
        .query(
          arangojs.aql`FOR entry IN ${this.collection} FILTER entry.id === ${id} RETURN entry`
        )
        .then((c) => c.all())
        .then((data) =>
          data.map((e) => [e.id, new this.controllerConstructor(e, this.collectionName)])
        )
    );
  }

  async findFilter(filter: string): Promise<Collection<Identifier, C>> {
    return new Collection<Identifier, C>(
      await this.database.db
        .query(
          arangojs.aql`FOR entry IN ${this.collection} FILTER ${filter} RETURN entry`
        )
        .then((c) => c.all())
        .then((data) =>
          data.map((e) => [e.id, new this.controllerConstructor(e, this.collectionName)])
        )
    );
  }

  async findOne(id: Identifier): Promise<C | undefined> {
    return this.database.db
      .query(
        arangojs.aql`FOR entry IN ${this.collection} LIMIT 1 FILTER entry.id === ${id} RETURN entry`
      )
      .then((c) => c.all())
      .then((data) => {
        return data?.[0]
          ? new this.controllerConstructor(data?.[0], this.collectionName)
          : undefined;
      });
  }

  async delete(id: Identifier): Promise<Collection<Identifier, C>> {
    return new Collection<Identifier, C>(
      await this.database.db
        .query(
          arangojs.aql`FOR entry IN ${this.collection} FILTER entry.id === ${id} REMOVE entry IN ${id} RETURN entry`
        )
        .then((c) =>
          c
            .all()
            .then((data) =>
              data.map((entry) => [
                entry.id,
                new this.controllerConstructor(entry, this.collectionName),
              ])
            )
        )
    );
  }

  async deleteOne(id: Identifier): Promise<C | undefined> {
    return this.database.db
      .query(
        arangojs.aql`FOR entry IN ${this.collection} LIMIT 1 FILTER entry.id === ${id} REMOVE entry IN ${id} RETURN entry`
      )
      .then((c) => c.all())
      .then((data) => {
        return data?.[0]
          ? new this.controllerConstructor(data?.[0], this.collectionName)
          : undefined;
      });
  }

  async update(
    id: Identifier,
    data: U
  ): Promise<Collection<Identifier, C>> {
    return new Collection<Identifier, C>(
      await this.database.db
        .query(
          arangojs.aql`FOR entry IN ${this.collection} FILTER entry.id === ${id} UPDATE ${data} IN ${this.collection} RETURN entry`
        )
        .then((c) =>
          c
            .all()
            .then((data) =>
              data.map((entry) => [
                entry.id,
                new this.controllerConstructor(entry, this.collectionName),
              ])
            )
        )
    );
  }

  async updateOne(
    id: Identifier,
    data: U
  ): Promise<C | undefined> {
    return this.database.db
      .query(
        arangojs.aql`FOR entry IN ${this.collection} FILTER entry.id === ${id} UPDATE ${data} IN ${this.collection} RETURN entry`
      )
      .then((c) =>
        c
          .all()
          .then((data) =>
            data?.[0] ? new this.controllerConstructor(data?.[0], this.collectionName) : undefined
          )
      );
  }
}
