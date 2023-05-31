import { QrCodeBase64 } from '../../usecases/interfaces/QrCodeBase64'
import qrImage from 'qrcode-base64'

export class LibQrCodeBase64 implements QrCodeBase64 {
  async draw(qrCode: string, options: any): Promise<string> {
    return await qrImage.drawImg(qrCode, options)
  }
}