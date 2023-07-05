import { LoadKeyWordUserController } from "../../aplication/controllers/keyword/LoadKeyWordUserController"
import { Controller } from "../../aplication/interfaces"
import { KeyWordMongo } from "../../infra/db/mongo/keyword/KeyWordMongo"
import { LoadKeyWordUserUseCase } from "../../usecases/keyword/LoadKeyWordUserUseCase"

export const makeLoadKeyWordUserController = (): Controller => {
  const keyWordRepository = new KeyWordMongo()
  const loadKeyWordUseCase = new LoadKeyWordUserUseCase(keyWordRepository)
  
  return new LoadKeyWordUserController(loadKeyWordUseCase)         
}