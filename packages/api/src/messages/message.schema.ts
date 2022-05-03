import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

import { Room } from "../rooms/room.schema"
import { RoomType } from "../rooms/types/room.type"
import { UserType } from "../users/types/user.type"
import { User } from "../users/user.schema"

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  text: string

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  sender: UserType

  @Prop({ type: Types.ObjectId, ref: Room.name, required: true })
  room: RoomType

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const MessageSchema = SchemaFactory.createForClass(Message)
