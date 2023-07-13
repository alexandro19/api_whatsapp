import { AddMessageController } from "../../aplication/controllers/message/AddMessageController"
import { Controller } from "../../aplication/interfaces"
import { AddMessageUseCase } from "../../usecases/message/AddMessageUseCase"
import { MessageMongo } from "../../infra/db/mongo/message/MessageMongo"

export const makeAddMessageController = (): Controller => {
  const messageRepository = new MessageMongo()
  const addMessageUseCase = new AddMessageUseCase(messageRepository)
  
  return new AddMessageController(addMessageUseCase)         
}