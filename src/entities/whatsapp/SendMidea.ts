export interface SendMidea {
  send(params: SendMidea.Params): Promise<SendMidea.Result>
}

export namespace SendMidea {
  export type Params = {
    session: string,
    number: string,
    files: any[]
  }

  export type Result = {
    success: boolean,
    error?: Error
  }
}