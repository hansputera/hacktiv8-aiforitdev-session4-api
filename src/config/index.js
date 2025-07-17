import { cleanEnv, host, port, str } from "envalid";

export const configEnv = cleanEnv(process.env, {
    GEMINI_API_KEY: str(),
    PORT: port({
        default: 3000,
    }),
    HOSTNAME: host({
        default: 'localhost',
    }),
    GEMINI_MODEL: str({
        default: 'gemini-2.5-flash',
    }),
});