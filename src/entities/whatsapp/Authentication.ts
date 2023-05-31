export interface Authentication {
  auth(params: Authentication.Params): Promise<Authentication.Result>      
}

export namespace Authentication {
  export type Params = {
    session: string
  }

  export type Result = {
    authenticated: boolean
  }
}