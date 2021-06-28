import { Field, ObjectType } from "@nestjs/graphql"
import { AuthType } from "./auth.type"

@ObjectType({ description: "Payload for signing in" })
export class SignInPayload {
  constructor({ token, me }: { token: string; me: AuthType }) {
    Object.assign(this, { token, me })
  }

  @Field({ description: "User token", nullable: true })
  token?: string

  @Field((): typeof AuthType => AuthType, {
    description: "Auth payload",
    nullable: true,
  })
  me?: AuthType
}
