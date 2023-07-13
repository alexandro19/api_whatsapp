import { EditMessageUseCase } from "../../usecases/message/EditMessageUseCase"
import { EditMessageController } from "../../aplication/controllers/message/EditMessageController"
import { Controller } from "../../aplication/interfaces"
import { MessageMongo } from "../../infra/db/mongo/message/MessageMongo"

export const makeEditMessageController = (): Controller => {
  const messageRepository  = new MessageMongo()
  const editMessageUseCase = new EditMessageUseCase(messageRepository)
  
  return new EditMessageController(editMessageUseCase)         
}