import { MongoHelper } from "../../../../infra/db/helpers/mongo-helper"
import { AddKeyWord, LoadKeyWordUser, EditKeyWord } from "../../../../entities/keyword"
import { KeyWordRepository } from "../../../../usecases/interfaces/db/KeyWordRepository"
import { ObjectId } from "mongodb"

const KEYWORD = "keyword"

export class KeyWordMongo implements KeyWordRepository {
  async add(params: AddKeyWord.Params): Promise<Boolean> {
    const keyWordCollection = await MongoHelper.getCollection(KEYWORD)
    const inserted = await keyWordCollection.insertOne(params)
    return inserted.insertedId !== null 
  }

  async loadUser(user: string): Promise<LoadKeyWordUser.Result[]> {
    const keyWordCollection = await MongoHelper.getCollection(KEYWORD)
    const keyWords = await keyWordCollection.find({
      userId: user
    }, {
      projection: {
        _id: 1,
        campaign: 1,
        keyword: 1
      }
    }).toArray()

    return keyWords && MongoHelper.mapCollection(keyWords)
  }

  async edit(params: EditKeyWord.Params): Promise<boolean> {
    const keyWordCollection = await MongoHelper.getCollection(KEYWORD)
    await keyWordCollection.findOneAndUpdate({
      _id: new ObjectId(params.id)
    },
    {
      $set: {
        campaign: params.campaign,
        keyword: params.keyword,
        userId: params.userId
      }
    },
    {
      upsert: true
    }) 
    
    return true
  }

  async delete(id: string): Promise<boolean> {
    const keyWordCollection = await MongoHelper.getCollection(KEYWORD)
    await keyWordCollection.deleteOne({
      _id: new ObjectId(id)
    })
    
    return true
  }
}