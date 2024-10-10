import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  accessToken: number


  @Field(() => String, { nullable: true })
  refreshToken?: string
}
