export interface EngineIsConnected {
  isConnected(session: string): Promise<boolean>
}