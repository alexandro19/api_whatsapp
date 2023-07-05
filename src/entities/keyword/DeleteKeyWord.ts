export interface DeleteKeyWord {
  delete(id: string): Promise<boolean>
}