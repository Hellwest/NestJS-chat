import { Field, ObjectType, Query, Resolver } from "@nestjs/graphql"

@ObjectType()
class QueryPlaceholder {
  @Field()
  placeholder: string
}

@Resolver("Auth")
export class AuthResolver {
  @Query((): typeof QueryPlaceholder => QueryPlaceholder, {
    name: "placeholder",
    description: "At least one query is needed in order for GraphQL to work",
  })
  getPlaceholder(): QueryPlaceholder {
    return new QueryPlaceholder()
  }
}
