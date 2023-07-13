import { MessageRepository } from "../interfaces/db/MessageRepository"
import { EditMessage } from "../../entities/message"

export class EditMessageUseCase implements EditMessage {
  constructor(private readonly messageRepository: MessageRepository){}

  async edit(params: EditMessage.Params): Promise<boolean> {
    return await this.messageRepository.edit(params) 
  }
}