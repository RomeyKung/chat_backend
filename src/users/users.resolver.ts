import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

//()=> arrow function for defer evaluation of the type and avoid circular dependency issues (Lazy Loading).
// This is a common pattern in NestJS to avoid circular dependencies in resolvers and services.
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args("createUserInput", { type: () => CreateUserInput }) createUserInput: CreateUserInput) {
    console.log("createUserInput", createUserInput);
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: "users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "user" })
  findOne(@Args("_id") _id: string) {
    return this.usersService.findOne(_id);
  }

  @Mutation(() => User)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args("_id") _id: string) {
    return this.usersService.remove(_id);
  }
}
