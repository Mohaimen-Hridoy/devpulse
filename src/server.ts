import app from "./app";
import config from "./config";
import { initDB } from "./db/index";

initDB().catch(console.error);

const port = process.env.PORT || config.port || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;