import { LoadKeyWordUser } from "../../../entities/keyword/LoadKeyWordUser"
import { AddKeyWord } from "../../../entities/keyword/AddKeyWord"
import { EditKeyWord } from "../../../entities/keyword/EditKeyWord"

export interface KeyWordRepository {
  add(params: AddKeyWord.Params): Promise<Boolean>
  loadUser(user: string): Promise<LoadKeyWordUser.Result[]>
  edit(params: EditKeyWord.Params): Promise<boolean>
  delete(id: string): Promise<boolean>
}