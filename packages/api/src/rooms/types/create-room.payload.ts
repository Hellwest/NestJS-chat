import { Field, ObjectType } from "@nestjs/graphql"

import { RoomType } from "./room.type"

@ObjectType({ description: "CreateRoom response object" })
export class CreateRoomPayload {
  @Field({ description: "Room ID" })
  recordId: string

  @Field((): typeof RoomType => RoomType, { description: "Room object" })
  record: RoomType
}
