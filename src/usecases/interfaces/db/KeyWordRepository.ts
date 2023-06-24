import { AddKeyWord } from "../../../entities/keyword/AddKeyWord"

export interface KeyWordRepository {
  add(params: AddKeyWord.Params): Promise<Boolean>
}