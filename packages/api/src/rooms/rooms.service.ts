import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"

import { RoomRepository } from "./room.repository"
import { CreateRoomInput } from "./types/create-room.input"
import { CreateRoomPayload } from "./types/create-room.payload"
import { EditRoomInput } from "./types/edit-room.input"
import { EditRoomPayload } from "./types/edit-room.payload"
import { RoomType } from "./types/room.type"

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async getRooms(): Promise<RoomType[]> {
    const entities = await this.roomRepository.roomModel.find()

    return entities.map((room) => new RoomType(room))
  }

  async getRoom(id: string): Promise<RoomType> {
    const room = await this.roomRepository.roomModel.findById(id)

    if (!room) {
      throw new NotFoundException("api.roomNotFound")
    }

    return new RoomType(room)
  }

  async createRoom(input: CreateRoomInput): Promise<CreateRoomPayload> {
    const { name } = input

    const existingRoom = await this.roomRepository.roomModel.findOne({ name })

    if (existingRoom) {
      throw new ConflictException("api.roomExists")
    }

    const room = await this.roomRepository.createRoom(input)

    const payload = new CreateRoomPayload()
    payload.recordId = room.id
    payload.record = new RoomType(room)

    return payload
  }

  async editRoom(input: EditRoomInput): Promise<EditRoomPayload> {
    const { id, name } = input

    const room = await this.roomRepository.roomModel.findById(id)

    if (!room) {
      throw new NotFoundException("api.roomNotFound")
    }

    room.name = name
    await room.save()

    const payload = new EditRoomPayload()
    payload.recordId = room.name
    payload.record = new RoomType(room)

    return payload
  }

  async deleteRoom(id: string): Promise<RoomType> {
    const room = await this.roomRepository.roomModel.findById(id)

    if (!room) {
      throw new NotFoundException("api.roomNotFound")
    }

    await room.delete()

    return new RoomType(room)
  }
}
