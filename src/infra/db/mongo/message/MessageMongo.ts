import { MongoHelper } from "../../../../infra/db/helpers/mongo-helper"
import { MessageRepository } from "../../../../usecases/interfaces/db/MessageRepository"
import { GetByKeyWord, AddMessage, EditMessage } from "../../../../entities/message"
import { ObjectId } from "mongodb"

const MESSAGE = "message"

export class MessageMongo implements MessageRepository {
  
  async create(params: AddMessage.Params): Promise<boolean> {
    const messageCollection = await MongoHelper.getCollection(MESSAGE)
    const inserted = await messageCollection.insertOne(params)
    return inserted.insertedId !== null
  }

  async getByKeyWord(keyword: string): Promise<GetByKeyWord.Result> {
    const messageCollection = await MongoHelper.getCollection(MESSAGE)
    const messages = await messageCollection.find({
      keywordId: keyword
    }, {
      projection: {
        _id: 1,
        order: 1,
        minutes: 1,
        seconds: 1,
        type: 1,
        message: 1,
        archive: 1,
      }
    }).sort({order: 1}).toArray()

    return messages && MongoHelper.mapCollection(messages)
  }

  async edit(params: EditMessage.Params): Promise<boolean> {
    const messageCollection = await MongoHelper.getCollection(MESSAGE)
    await messageCollection.findOneAndUpdate({
      _id: new ObjectId(params.id)
    },
    {
      $set: {
        order: params.order,
        minutes: params.minutes,
        seconds: params.seconds,
        type: params.type,
        message: params.message,
        archive: params.archive
      }
    },
    {
      upsert: true
    }) 
    
    return true
  }
  
}