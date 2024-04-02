import { cleanEnv } from "envalid";
import { str, port } from "envalid";

export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_URI: str(),
    SESSION_SECRET: str(),
});
