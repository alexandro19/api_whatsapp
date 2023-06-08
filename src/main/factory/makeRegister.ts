import { RegisterUseCase, LoginUseCase } from "../../usecases/account"
import { RegisterController } from "../../aplication/controllers/account/RegisterController"
import { Controller } from "../../aplication/interfaces"
import { AccountMongo } from "../../infra/db/mongo/account/AccountMongo"
import { BcryptAdapter, JwtAdapter } from "../../infra/cryptography"
import env from '../config/env'

export const makeRegisterController = (): Controller => {
  
  const accountMongo = new AccountMongo()
  const hasher       = new BcryptAdapter(12)
  const bycript      = new JwtAdapter(env.jwtSecret)
  
  const registerUseCase = new RegisterUseCase(accountMongo, hasher)
  const loginUseCase    = new LoginUseCase(accountMongo, hasher, bycript)

  return new RegisterController(registerUseCase, loginUseCase)         
}