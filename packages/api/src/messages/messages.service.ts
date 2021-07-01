import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { User } from "../users/user.schema"
import { UserType } from "../users/types/user.type"
import { RoomsService } from "../rooms/rooms.service"
import { MessageRepository } from "./message.repository"
import { MessageType } from "./types/message.type"
import { SendMessageInput } from "./types/send-message.input"
import { EditMessageInput } from "./types/edit-message.input"

@Injectable()
export class MessagesService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly roomsService: RoomsService,
  ) {}

  async getMessages(roomId: string): Promise<MessageType[]> {
    const messages = await this.messageRepository.getMessages(roomId)

    return messages.map((message) => new MessageType(message))
  }

  async sendMessage(user: User, input: SendMessageInput): Promise<MessageType> {
    const { roomId, text } = input

    const room = await this.roomsService.getRoom(roomId)

    const message = new this.messageRepository.messageModel()

    message.text = text
    message.sender = new UserType(user)
    message.room = room
    await message.save()

    return new MessageType(message)
  }

  async editMessage(user: User, input: EditMessageInput): Promise<MessageType> {
    const { id, text } = input

    const message = await this.messageRepository.messageModel.findById(id)

    if (!message) {
      throw new NotFoundException("api.messageNotFound")
    }

    if (user.id !== message.sender.id) {
      throw new ForbiddenException("api.notYourOwnMessage")
    }

    message.text = text
    await message.save()

    return new MessageType(message)
  }
}
