import { createParamDecorator } from "@nestjs/common"

import { User } from "../users/user.schema"

type GqlResolverFields = [unknown, unknown, { req: any }, unknown] // TODO: improve type definitions

export const CurrentUser = createParamDecorator(
  (_, fields: GqlResolverFields): User | undefined => fields[2].req.user,
)
