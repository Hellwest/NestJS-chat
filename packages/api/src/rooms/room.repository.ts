import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Room } from "./room.schema"
import { CreateRoomInput } from "./types/create-room.input"

@Injectable()
export class RoomRepository {
  constructor(@InjectModel(Room.name) readonly roomModel: Model<Room>) {}

  async createRoom(input: CreateRoomInput): Promise<Room> {
    const { name } = input

    const room = new this.roomModel()
    room.name = name

    return await room.save()
  }
}
