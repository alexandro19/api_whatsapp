export interface Register {
  create(params: Register.Params): Promise<Register.Result>
}

export namespace Register {
  export type Params = {
    nome: string,
    email: string,
    celular: string,
    password: string
  }

  export type Result = {
    result: boolean,
    error?: Error
  }
}
