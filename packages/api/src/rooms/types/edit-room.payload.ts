import { Field, ObjectType } from "@nestjs/graphql"

import { RoomType } from "./room.type"

@ObjectType({ description: "Payload for editing a room" })
export class EditRoomPayload {
  @Field({ description: "ID of an edited room" })
  recordId: string

  @Field((): typeof RoomType => RoomType, {
    description: "The edited room object",
  })
  record: RoomType
}
