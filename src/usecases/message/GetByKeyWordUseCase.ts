import { MessageRepository } from "../../usecases/interfaces/db/MessageRepository"
import { GetByKeyWord } from "../../entities/message"

export class GetByKeyWordUseCase implements GetByKeyWord {
  constructor(private readonly messageRepository: MessageRepository) {}

  async get(keyword: string): Promise<GetByKeyWord.Result> {
    return await this.messageRepository.getByKeyWord(keyword)
  }
}