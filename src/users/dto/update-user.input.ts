import { CreateUserInput } from "./create-user.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  //partialType makes all fields optional
  // @Field()
  // _id: string;
}
