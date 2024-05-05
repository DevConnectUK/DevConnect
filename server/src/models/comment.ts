import { model, InferSchemaType } from "mongoose";
import { postComponentSchema } from "./postComponent";

export type Comment = InferSchemaType<typeof postComponentSchema>;

export default model<Comment>("Comment", postComponentSchema);
