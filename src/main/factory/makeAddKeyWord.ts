import { AddKeyWordController } from "../../aplication/controllers/keyword/AddKeyWordController"
import { Controller } from "../../aplication/interfaces"
import { KeyWordMongo } from "../../infra/db/mongo/keyword/KeyWordMongo"
import { AddKeyWordUseCase } from "../../usecases/keyword/AddKeyWordUseCase"

export const makeAddKeyWordController = (): Controller => {
  const keyWordRepository = new KeyWordMongo()
  const addKeyWordUseCase = new AddKeyWordUseCase(keyWordRepository)
  
  return new AddKeyWordController(addKeyWordUseCase)         
}