import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Message } from "./message.schema"

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name) readonly messageModel: Model<Message>,
  ) {}

  async getMessages(roomId: string): Promise<Message[]> {
    const allMessages = await this.messageModel.find()

    // FIXME: Mongoose filtering by nested objects' ids problem
    return allMessages.filter((message) => message.room.id === roomId)
  }
}
