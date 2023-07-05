import { EditKeyWordController } from "../../aplication/controllers/keyword/EditKeyWordController"
import { Controller } from "../../aplication/interfaces"
import { KeyWordMongo } from "../../infra/db/mongo/keyword/KeyWordMongo"
import { EditKeyWordUseCase } from "../../usecases/keyword/EditKeyWordUseCase"

export const makeEditKeyWordController = (): Controller => {
  const keyWordRepository  = new KeyWordMongo()
  const editKeyWordUseCase = new EditKeyWordUseCase(keyWordRepository)
  
  return new EditKeyWordController(editKeyWordUseCase)         
}