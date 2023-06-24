import { KeyWordRepository } from "../../usecases/interfaces/db/KeyWordRepository"
import { AddKeyWord } from "../../entities/keyword/AddKeyWord"

export class AddKeyWordUseCase implements AddKeyWord {
  constructor(private readonly keyWordRepository: KeyWordRepository){}

  async add(params: AddKeyWord.Params): Promise<Boolean> {
    return await this.keyWordRepository.add(params)  
  }
}