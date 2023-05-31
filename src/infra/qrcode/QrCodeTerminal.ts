import { QrCodeTerminal } from '../../usecases/interfaces/QrCodeTerminal';
import qrcode from 'qrcode-terminal'

export class QrTerminalImplements implements QrCodeTerminal {
  generate(qrCode: string) {
    qrcode.generate(qrCode, {small: true})  
  }
}