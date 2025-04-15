import { Logger, NotFoundException } from "@nestjs/common";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractEntity } from "./abstract.schema";

/**
 * AbstractRepository class is a base class for all repositories in the application.
 * It provides common methods for creating and finding documents in the database.
 * It uses Mongoose as the ODM (Object Document Mapper) for MongoDB.
 * It is generic and can be used with any Mongoose model that extends AbstracT (rename to Entity because more generic , combine entity and document in one class).
 * rename TDocument to T for generalization and cleaner code
 * and to follow the convention of naming the class after the entity it represents.
 */

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, "_id">): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as T;
    // as Unknown for TypeScript to not complain about the type of the returned object
    // as T to cast the object back to the original type
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean<T>().exec();
    // .lean() is preventing hydration back to Mongoose document, in this case we want to return plain object
    // .exec() is used to execute the query and return a promise

    if (!document) {
      this.logger.warn(`Document was not found with filterQuery: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException("Document not found");
    }

    return document;
  }

  async findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true, // return the updated document
      })
      .lean<T>()
      .exec();
    // .lean() is preventing hydration back to Mongoose document, in this case we want to return plain object
    if (!document) {
      this.logger.warn(`Document was not found with filterQuery: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException("Document not found");
    }
    return document;
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery).lean<T[]>().exec();
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOneAndDelete(filterQuery).lean<T>().exec();
    // .lean() is preventing hydration back to Mongoose document, in this case we want to return plain object
    if (!document) {
      this.logger.warn(`Document was not found with filterQuery: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException("Document not found");
    }
    return document;
  }
}
