import { Field, ID, ObjectType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"

@ObjectType({ description: "Chat user" })
export class UserType {
  @Field((): GraphQLScalarType => ID, { description: "User ID" })
  id: string

  @Field({ description: "User login" })
  login: string

  @Field({ description: "User creation date" })
  createdAt: Date

  @Field({ description: "User update date" })
  updatedAt: Date
}
