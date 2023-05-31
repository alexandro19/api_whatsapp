export interface ValidPhone {
  isValid(number: string): Promise<boolean>     
}