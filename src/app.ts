import express, { type Application, type Request, type Response } from "express";

import { userRoute } from "./modules/user/user.route.js";
import { issueRoute } from "./modules/issue/issue.route.js";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server Running",
  });
});

app.use("/api/auth", userRoute);
app.use("/api/issues", issueRoute);

export default app;