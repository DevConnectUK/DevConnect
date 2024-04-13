import { model, InferSchemaType } from "mongoose";
import { postComponentSchema } from "./postComponent";

type Post = InferSchemaType<typeof postComponentSchema>;

export default model<Post>("Post", postComponentSchema);
