import { Field, ID, ObjectType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"

import { Room } from "../room.schema"

@ObjectType({ description: "Room object" })
export class RoomType {
  constructor(room?: Room) {
    this.id = room.id
    this.name = room.name
    this.createdAt = room.createdAt
    this.updatedAt = room.updatedAt
  }

  @Field((): GraphQLScalarType => ID, { description: "Room ID" })
  id: string

  @Field({ description: "Room name" })
  name: string

  @Field({ description: "Room creation date" })
  createdAt: Date

  @Field({ description: "Room update date" })
  updatedAt: Date
}
