import { Register } from "../../../entities/account/Register"

export interface AccountRepository {
  create(params: Register.Params): Promise<Register.Result>
  loadByEmail(email: string): Promise<AccountRepository.ModelAccount>    
  existsByEmail(email: string): Promise<boolean>
  updateAccessToken(id: string, token: string): Promise<void>
  loadByToken(token: string, role?: string): Promise<Omit<AccountRepository.ModelAccount, 'password'>>
}

export namespace AccountRepository {
  export type ModelAccount = {
    id: string,
    nome: string,
    email: string,
    celular: string,
    password: string
  }
}