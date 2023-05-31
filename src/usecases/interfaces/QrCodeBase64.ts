export interface QrCodeBase64 {
  draw(qrCode: string, options: any): Promise<string>
}