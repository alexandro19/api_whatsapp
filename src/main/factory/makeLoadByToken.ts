import { LoadByTokenController } from "../../aplication/controllers/account/LoadByTokenController"
import { Controller } from "../../aplication/interfaces"
import { LoadAccountByTokenUseCase } from "../../usecases/account/LoadAccountByTokenUseCase"
import { AccountMongo } from "../../infra/db/mongo/account/AccountMongo"
import { JwtAdapter } from "../../infra/cryptography"
import env from "../../main/config/env"

export const makeLoadByToken = (): Controller => {
  const accountRepository = new AccountMongo()
  const decrypter         = new JwtAdapter(env.jwtSecret)
  const loadByToken       = new LoadAccountByTokenUseCase(decrypter, accountRepository)
  
  return new LoadByTokenController(loadByToken)
}