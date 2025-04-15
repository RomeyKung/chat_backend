import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  // @IsEmail()
  // @IsNotEmpty()
  email: string;

  @Field()
  // @Type(() => String)
  // @IsNotEmpty()
  // @MinLength(4)
  password: string;
}
