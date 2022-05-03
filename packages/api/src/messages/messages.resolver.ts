import { Inject, UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql"
import { RedisPubSub } from "graphql-redis-subscriptions"

import { GqlAuthGuard } from "../auth/auth.guard"
import { CurrentUser } from "../auth/user.decorator"
import { User } from "../users/user.schema"
import { MessagesService } from "./messages.service"
import { EditMessageInput } from "./types/edit-message.input"
import { MessageType } from "./types/message.type"
import { SendMessageInput } from "./types/send-message.input"

const NEW_MESSAGE_RECEIVED = "NEW_MESSAGE_RECEIVED"

@Resolver("Messages")
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject("PUB_SUB") private readonly pubSub: RedisPubSub,
  ) {}

  @Query((): [typeof MessageType] => [MessageType], {
    name: "getMessages",
    description: "Get all messages in a room",
  })
  @UseGuards(GqlAuthGuard)
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
  @UseGuards(GqlAuthGuard)
  async sendMessage(
    @CurrentUser() user: User,
    @Args("input") input: SendMessageInput,
  ): Promise<MessageType> {
    const payload = await this.messagesService.sendMessage(user, input)

    this.pubSub.publish(NEW_MESSAGE_RECEIVED, { NEW_MESSAGE_RECEIVED: payload })

    return payload
  }

  @Mutation((): typeof MessageType => MessageType, {
    name: "editMessage",
    description: "Edit a message",
  })
  @UseGuards(GqlAuthGuard)
  async editMessage(
    @CurrentUser() user: User,
    @Args("input") input: EditMessageInput,
  ): Promise<MessageType> {
    return await this.messagesService.editMessage(user, input)
  }

  @Subscription((): typeof MessageType => MessageType, {
    name: NEW_MESSAGE_RECEIVED,
    description: "Subscribe to new messages in the chat",
    nullable: true,
  })
  newMessageReceived(): AsyncIterator<MessageType> | null {
    return this.pubSub.asyncIterator<MessageType>(NEW_MESSAGE_RECEIVED)
  }
}
