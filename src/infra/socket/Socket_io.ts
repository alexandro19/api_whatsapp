import { io } from '../../main/config/app'
import { Socket } from '../../usecases/interfaces/Socket'

export class Socket_io implements Socket {
  emit(event: string, data: any) {
    io.emit(event, data)
  }
}