import { Field, ID, InputType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"

@InputType({ description: "Input for sending a message" })
export class SendMessageInput {
  @Field((): GraphQLScalarType => ID, { description: "Room ID" })
  roomId: string

  @Field({ description: "Message text" })
  text: string
}
