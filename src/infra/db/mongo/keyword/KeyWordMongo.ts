import { MongoHelper } from "../../../../infra/db/helpers/mongo-helper"
import { AddKeyWord } from "../../../../entities/keyword/AddKeyWord"
import { KeyWordRepository } from "../../../../usecases/interfaces/db/KeyWordRepository"

const KEYWORD = "keyword"

export class KeyWordMongo implements KeyWordRepository {
  async add(params: AddKeyWord.Params): Promise<Boolean> {
    const keyWordCollection = await MongoHelper.getCollection(KEYWORD)
    const inserted = await keyWordCollection.insertOne(params)
    return inserted.insertedId !== null 
  }
}