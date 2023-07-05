import { KeyWordRepository } from "../../usecases/interfaces/db/KeyWordRepository"
import { DeleteKeyWord } from "../../entities/keyword"

export class DeleteKeyWordUseCase implements DeleteKeyWord {
  constructor(private readonly keyWordRepository: KeyWordRepository){}

  async delete(id: string): Promise<boolean> {
    return await this.keyWordRepository.delete(id)  
  }
}