import express from "express"
import type { Application, Request, Response } from "express"

import { userRoute } from "./modules/user/user.route"
import { issueRoute } from "./modules/issue/issue.route"

const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server Running",
  })
})

app.use("/api/auth", userRoute)
app.use("/api/issues", issueRoute)//

export default app

