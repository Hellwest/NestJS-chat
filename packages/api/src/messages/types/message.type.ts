import { Field, ID, ObjectType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"

import { UserType } from "../../users/types/user.type"
import { RoomType } from "../../rooms/types/room.type"
import { Message } from "../message.schema"

@ObjectType({ description: "Chat message object" })
export class MessageType {
  constructor(message?: Message) {
    this.id = message.id
    this.text = message.text
    this.sender = message.sender
    this.room = message.room
    this.createdAt = message.createdAt
    this.updatedAt = message.updatedAt
  }

  @Field((): GraphQLScalarType => ID, { description: "Message ID" })
  id: string

  @Field({ description: "Message text" })
  text: string

  @Field((): typeof UserType => UserType, {
    description: "User that sent the message",
  })
  sender: UserType

  @Field((): typeof RoomType => RoomType, {
    description: "Room in which the message has been sent",
  })
  room: RoomType

  @Field({ description: "Message creation date" })
  createdAt: Date

  @Field({ description: "Message update date" })
  updatedAt: Date
}
