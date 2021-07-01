import { Field, ID, InputType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"

@InputType({ description: "Input for editing a message" })
export class EditMessageInput {
  @Field((): GraphQLScalarType => ID, { description: "Message ID" })
  id: string

  @Field({ description: "Edited message text" })
  text: string
}
