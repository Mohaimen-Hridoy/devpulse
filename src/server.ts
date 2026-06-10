import app from "./app";
import config from "./config";
import { initDB } from "./db/index";

const startServer = async () => {
  try {
    await initDB();

    const port = process.env.PORT || config.port || 8000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();