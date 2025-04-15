import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

/**
 * AbstractDocument class is a base class for all Mongoose documents in the application.
 * It defines a common structure for documents, including the _id field.
 * prevent forgetting to set _id in other Documents
 */

@Schema()
@ObjectType({ isAbstract: true })
//isAbstract:true is used to indicate that this class is an abstract class and should not be instantiated directly.
export class AbstractEntity {
  @Prop({ type: SchemaTypes.ObjectId })
  @Field(() => ID)
  _id: Types.ObjectId;
}
