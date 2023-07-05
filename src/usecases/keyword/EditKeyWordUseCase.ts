import { KeyWordRepository } from "../../usecases/interfaces/db/KeyWordRepository"
import { EditKeyWord } from "../../entities/keyword/EditKeyWord"

export class EditKeyWordUseCase implements EditKeyWord {
  constructor(private readonly keyWordRepository: KeyWordRepository){}

  async edit(params: EditKeyWord.Params): Promise<boolean> {
    return await this.keyWordRepository.edit(params)  
  }
}