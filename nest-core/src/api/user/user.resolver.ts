import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from 'src/common/database/entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String, { name: 'hello' })
  helloWorld() {
    return 'Hello World 3';
  }

  @Mutation(() => User, { name: 'addUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getAllUser' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => String, { name: 'getUserById' })
  findOne(@Args('input', { type: () => UpdateUserInput }) input: number) {
    return 'hello world';
  }
}
