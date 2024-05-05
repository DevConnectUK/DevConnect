import { model, InferSchemaType } from "mongoose";
import { postComponentSchema } from "./postComponent";

export type Post = InferSchemaType<typeof postComponentSchema>;

export default model<Post>("Post", postComponentSchema);
