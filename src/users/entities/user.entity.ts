import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractEntity } from "src/common/database/abstract.schema";

@Schema({ versionKey: false })
// versionKey is a default field added by Mongoose to track document versioning. Setting it to false prevents Mongoose from adding this field to the schema.
@ObjectType()
export class User extends AbstractEntity {
//export class UserDocument for the User schema,
//which extends the AbstractDocument class. This means that UserDocument will inherit the properties and methods of AbstractDocument, including the _id field.

// rename userDocument to User for generalization and cleaner code
// and to follow the convention of naming the class after the entity it represents.

    @Prop()
    @Field()
    email: string;

    @Prop()
    password: string;
    //not decorated with @Field() because it is not needed to expose the password field in the GraphQL schema.
}

export const UserSchema = SchemaFactory.createForClass(User);
//SchemaFactory is a utility function provided by Mongoose to create a schema from a class.
//It automatically generates the schema based on the class properties and their decorators.
//The createForClass function takes the class as an argument and returns a Mongoose schema.
//The UserSchema is now a Mongoose schema that can be used to create a model and interact with the database.
