import { Field, ID, InputType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"

@InputType({ description: "Input for editing a room" })
export class EditRoomInput {
  @Field((): GraphQLScalarType => ID, { description: "ID of a room to edit" })
  id: string

  @Field({ description: "New name of the room" })
  name: string
}
