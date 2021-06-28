import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"

import { User } from "../users/user.schema"
import { GqlAuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"
import { AuthType } from "./types/auth.type"
import { SignInInput } from "./types/sign-in.input"
import { SignInPayload } from "./types/sign-in.payload"
import { SignUpInput } from "./types/sign-up.input"
import { SignUpPayload } from "./types/sign-up.payload"
import { CurrentUser } from "./user.decorator"

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((): typeof AuthType => AuthType, {
    name: "me",
    description: "At least one query is needed in order for GraphQL to work",
  })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<AuthType> {
    return await this.authService.me(user)
  }

  @Mutation((): typeof SignUpPayload => SignUpPayload, {
    name: "signUp",
    description: "Register in the chat app",
  })
  async signUp(@Args("input") input: SignUpInput): Promise<SignUpPayload> {
    return await this.authService.signUp(input)
  }

  @Mutation((): typeof SignInPayload => SignInPayload, {
    name: "signIn",
    description: "Get authentication token and auth info",
  })
  async signIn(@Args("input") input: SignInInput): Promise<SignInPayload> {
    return await this.authService.signIn(input)
  }
}
