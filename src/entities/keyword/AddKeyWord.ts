export interface AddKeyWord {
  add(params: AddKeyWord.Params): Promise<Boolean>
}

export namespace AddKeyWord {
  export type Params = {
    campaign: string,
    keyword: string,
    userId: string
  }
}