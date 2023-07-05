import { DeleteKeyWordController } from "../../aplication/controllers/keyword/DeleteKeyWordController"
import { Controller } from "../../aplication/interfaces"
import { KeyWordMongo } from "../../infra/db/mongo/keyword/KeyWordMongo"
import { DeleteKeyWordUseCase } from "../../usecases/keyword/DeleteKeyWordUseCase"

export const makeDeleteKeyWordController = (): Controller => {
  const keyWordRepository    = new KeyWordMongo()
  const deleteKeyWordUseCase = new DeleteKeyWordUseCase(keyWordRepository)
  
  return new DeleteKeyWordController(deleteKeyWordUseCase)         
}