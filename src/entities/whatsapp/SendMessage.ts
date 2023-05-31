export interface SendMessage {
  send(params: SendMessage.Params): Promise<SendMessage.Result>
}

export namespace SendMessage {
  export type Params = {
    session: string,
    number: string,
    message: string,
    files?: any[]
  }

  export type Result = {
    success: boolean,
    error?: Error
  }
}