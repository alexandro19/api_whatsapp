export interface EditMessage {
  edit(params: EditMessage.Params): Promise<boolean>
}

export namespace EditMessage {
  export type Params = {
    id: string,
    keywordId: string,
    order: number,
    minutes: number,
    seconds: number,
    type: string,
    message: string,
    archive: string
  }  
}