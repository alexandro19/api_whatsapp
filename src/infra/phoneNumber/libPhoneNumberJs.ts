import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js'
import { ParsePhone, ValidPhone } from '../../usecases/interfaces'

export class LibPhoneNumber implements ValidPhone, ParsePhone {
  
  async isValid(number: string): Promise<boolean> {
    return await isValidPhoneNumber(number, 'BR')  
  }

  async parse(number: string): Promise<string> {
    return await parsePhoneNumber(number, "BR")?.format("E.164").replace("+", "")  
  }
}