export interface ParsePhone {
  parse(number: string): Promise<string>
}