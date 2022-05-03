import { Field, ObjectType } from "@nestjs/graphql"

import { AuthType } from "./auth.type"

@ObjectType({ description: "Payload for signing up" })
export class SignUpPayload {
  @Field({ description: "Created user ID", nullable: true })
  recordId?: string

  @Field((): typeof AuthType => AuthType, {
    description: "Auth payload",
    nullable: true,
  })
  record?: AuthType
}
