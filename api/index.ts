import app from "../src/app";
import { initDB } from "../src/db/index";

initDB().catch(console.error);

export default app;