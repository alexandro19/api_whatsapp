export interface GetByKeyWord {
  get(keyword: string): Promise<GetByKeyWord.Result>
}

type Messages = {
  id: string,
  keywordId: string,
  order: number,
  minutes: string,
  seconds: string,
  type: string,
  message: string,
  archive: string
}

export namespace GetByKeyWord{
  export type Result = Messages[]
}