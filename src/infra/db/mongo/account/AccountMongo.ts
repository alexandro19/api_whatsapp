import { Register } from "entities/account"
import { AccountRepository } from "../../../../usecases/interfaces/db/AccountRepository"
import { MongoHelper } from "../../../../infra/db/helpers/mongo-helper"
import { ObjectId } from "mongodb"

const ACCOUNT = 'accounts'

export class AccountMongo implements AccountRepository {

  async create(params: Register.Params): Promise<Register.Result> {
    const accountCollection = await MongoHelper.getCollection(ACCOUNT)
    const inserted = await accountCollection.insertOne(params)
    return { result: inserted.insertedId !== null }  
  }

  async existsByEmail(email: string): Promise<boolean> {
    const accountCollection = await MongoHelper.getCollection(ACCOUNT)
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null 
  }

  async loadByEmail(email: string): Promise<AccountRepository.ModelAccount> {
    const accountCollection = await MongoHelper.getCollection(ACCOUNT)
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }
 
  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection(ACCOUNT)
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}