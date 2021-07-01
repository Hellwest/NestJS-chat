import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  login: string

  @Prop({ required: true })
  password: string

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
