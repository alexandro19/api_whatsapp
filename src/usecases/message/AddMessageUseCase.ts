import { MessageRepository } from "../../usecases/interfaces/db/MessageRepository"
import { AddMessage } from "../../entities/message/AddMessage"

export class AddMessageUseCase implements AddMessage {
  constructor(private readonly messageRepository: MessageRepository){}

  async add(params: AddMessage.Params): Promise<boolean> {
    return await this.messageRepository.create(params) 
  }
}