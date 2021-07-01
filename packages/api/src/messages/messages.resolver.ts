import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { GqlAuthGuard } from "../auth/auth.guard"
import { CurrentUser } from "../auth/user.decorator"
import { User } from "../users/user.schema"
import { MessagesService } from "./messages.service"
import { EditMessageInput } from "./types/edit-message.input"
import { MessageType } from "./types/message.type"
import { SendMessageInput } from "./types/send-message.input"

@Resolver("Messages")
@UseGuards(GqlAuthGuard)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Query((): [typeof MessageType] => [MessageType], {
    name: "getMessages",
    description: "Get all messages in a room",
  })
  async getMessages(
    @Args({ name: "roomId", description: "ID of a room to get messages of" })
    roomId: string,
  ): Promise<MessageType[]> {
    return await this.messagesService.getMessages(roomId)
  }

  @Mutation((): typeof MessageType => MessageType, {
    name: "sendMessage",
    description: "Send a message to the chat",
  })
  async sendMessage(
    @CurrentUser() user: User,
    @Args("input") input: SendMessageInput,
  ): Promise<MessageType> {
    return await this.messagesService.sendMessage(user, input)
  }

  @Mutation((): typeof MessageType => MessageType, {
    name: "editMessage",
    description: "Edit a message",
  })
  async editMessage(
    @CurrentUser() user: User,
    @Args("input") input: EditMessageInput,
  ): Promise<MessageType> {
    return await this.messagesService.editMessage(user, input)
  }
}
