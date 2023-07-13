import { EditMessage, GetByKeyWord, AddMessage } from "../../../entities/message"

export interface MessageRepository {
  create(params: AddMessage.Params): Promise<boolean>
  edit(params: EditMessage.Params): Promise<boolean>
  getByKeyWord(keyword: string): Promise<GetByKeyWord.Result>
}