export interface Session {
  fetch(params: Session.Params): Promise<Session.Result>
}

export namespace Session {
  export type Params = {
    session: string
  } 

  export type Result = {
    session?: string,
    connected?: boolean,
    qrCode?: string,
    phone?: string
  }
}