import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  // @IsNotEmpty()
  email: string;

  @Field()
  @IsStrongPassword()
  // @Type(() => String)
  // @IsNotEmpty()
  // @MinLength(4)
  password: string;
}
