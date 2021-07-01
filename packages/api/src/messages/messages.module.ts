import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { RoomsModule } from "../rooms/rooms.module"
import { MessageRepository } from "./message.repository"
import { Message, MessageSchema } from "./message.schema"
import { MessagesResolver } from "./messages.resolver"
import { MessagesService } from "./messages.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    RoomsModule,
  ],
  providers: [MessagesResolver, MessagesService, MessageRepository],
})
export class MessagesModule {}
