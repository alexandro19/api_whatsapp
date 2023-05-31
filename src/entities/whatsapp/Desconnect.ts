export interface Desconnect {
  close(params: Desconnect.params): Promise<Desconnect.Result>    
}

export namespace Desconnect {
  export type params = {
    session: string
  }

  export type Result = {
    desconnected: boolean,
    error?: Error
  }
}