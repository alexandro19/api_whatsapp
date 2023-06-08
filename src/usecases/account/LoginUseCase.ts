import { AccountRepository } from "../../usecases/interfaces/db/AccountRepository"
import { Login } from "../../entities/account"
import { Encrypter, HashComparer } from "../../usecases/interfaces/cryptography"

export class LoginUseCase implements Login {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter) {}

  async auth(params: Login.Params): Promise<Login.Result> {
    const account = await this.accountRepository.loadByEmail(params.email)
    
    if (account) {
      const isValid = await this.hashComparer.compare(params.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.accountRepository.updateAccessToken(account.id, accessToken)
        return {
          token: accessToken
        }
      }
    }
    return null 
  }
}