export interface AddMessage {
  add(params: AddMessage.Params): Promise<boolean>
}

export namespace AddMessage {
  export type Params = {
    keywordId: string,
    order: number,
    minutes: number,
    seconds: number,
    type: string,
    message: string,
    archive: string
  }  
}