export interface EditKeyWord {
  edit(params: EditKeyWord.Params): Promise<boolean>
}

export namespace EditKeyWord {
  export type Params = {
    id: string,
    campaign: string,
    keyword: string,
    userId: string
  }
}