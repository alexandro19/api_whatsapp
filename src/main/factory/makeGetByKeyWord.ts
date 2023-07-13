import { GetByKeyWordController } from "../../aplication/controllers/message/GetByKeyWordController"
import { Controller } from "../../aplication/interfaces"
import { GetByKeyWordUseCase } from "../../usecases/message"
import { MessageMongo } from "../../infra/db/mongo/message/MessageMongo"

export const makeGetByKeyWordController = (): Controller => {
  const messageRepository   = new MessageMongo()
  const getByKeyWordUseCase = new GetByKeyWordUseCase(messageRepository)
  
  return new GetByKeyWordController(getByKeyWordUseCase)         
}