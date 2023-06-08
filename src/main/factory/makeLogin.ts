import { LoginUseCase } from "../../usecases/account"
import { LoginController } from "../../aplication/controllers/account/LoginController"
import { Controller } from "../../aplication/interfaces"
import { AccountMongo } from "../../infra/db/mongo/account/AccountMongo"
import { BcryptAdapter, JwtAdapter } from "../../infra/cryptography"
import env from "../../main/config/env"

export const makeLoginController = (): Controller => {
  
  const accountRepository = new AccountMongo()
  const hash              = new BcryptAdapter(env.salt as number)
  const encrypt           = new JwtAdapter(env.jwtSecret)
  const login             = new LoginUseCase(accountRepository, hash, encrypt)
  
  return new LoginController(login)
}