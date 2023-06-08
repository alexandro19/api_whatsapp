import { AccountRepository } from "../../usecases/interfaces/db/AccountRepository"
import { Register } from "../../entities/account/Register"
import { Hasher } from "../../usecases/interfaces/cryptography/Hasher"

export class RegisterUseCase implements Register {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly hasher: Hasher){}
  
  async create(params: Register.Params): Promise<Register.Result> {
    if(await this.accountRepository.existsByEmail(params.email)){
      return { result: false, error: new Error('Email já cadastrado') }
    }
    const hasherPassword = await this.hasher.hash(params.password)
    return await this.accountRepository.create({...params, password: hasherPassword})  
  }
}