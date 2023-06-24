import { Decrypter } from '../../usecases/interfaces/cryptography'
import { LoadAccountByToken } from '../../entities/account/LoadAccountByToken'
import { AccountRepository } from '../../usecases/interfaces/db/AccountRepository'

export class LoadAccountByTokenUseCase implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly accountRepository: AccountRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const account = await this.accountRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
