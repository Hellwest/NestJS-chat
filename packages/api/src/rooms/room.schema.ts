import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ required: true })
  name: string

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const RoomSchema = SchemaFactory.createForClass(Room)
