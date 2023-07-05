export interface LoadKeyWordUser {
  load(user: string): Promise<LoadKeyWordUser.Result[]>
}

export namespace LoadKeyWordUser {
  export type Result = {
    id: string, 
    campaign: string,
    keyword: string
  }
}