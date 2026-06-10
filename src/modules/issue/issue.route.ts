import { Router } from "express"
import { issueController } from "./issue.controller.js"
import { auth } from "../../middlewares/auth.js"

const router = Router()

router.post("/", auth("contributor", "maintainer"), issueController.createIssue)
router.get("/", issueController.getAllIssues)
router.get("/:id", issueController.getSingleIssue)
router.patch("/:id", auth("contributor", "maintainer"), issueController.updateIssue)
router.delete("/:id", auth("maintainer"), issueController.deleteIssue)

export const issueRoute = router