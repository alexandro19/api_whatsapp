import { LoadKeyWordUser } from "entities/keyword/LoadKeyWordUser";
import { KeyWordRepository } from "usecases/interfaces/db/KeyWordRepository";

export class LoadKeyWordUserUseCase implements LoadKeyWordUser {
  constructor(private readonly keyWordRepository: KeyWordRepository) {}

  async load(user: string): Promise<LoadKeyWordUser.Result[]> {
    return await this.keyWordRepository.loadUser(user)  
  }
}