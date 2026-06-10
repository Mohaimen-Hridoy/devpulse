import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/index.js";

initDB().catch(console.error);

const port = process.env.PORT || config.port || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;