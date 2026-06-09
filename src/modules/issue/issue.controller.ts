import type { Request, Response } from "express"
import { issueService } from "./issue.service"

const createIssue = async (req: any, res: Response) => {
  try {
    const result = await issueService.createIssue(req.body, req.user)

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getAllIssues = async (req: Request, res: Response) => {
  const result = await issueService.getAllIssues(req.query)

  res.status(200).json({
    success: true,
    message: "Issues retrieved successfully",
    data: result,
  })
}

const getSingleIssue = async (req: Request, res: Response) => {
  const result = await issueService.getSingleIssue(
    req.params.id as string
  )

  res.status(200).json({
    success: true,
    message: "Issue retrieved successfully",
    data: result,
  })
}

const updateIssue = async (req: any, res: Response) => {
  try {
    const result = await issueService.updateIssue(
      req.params.id as string,
      req.body,
      req.user
    )

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteIssue = async (req: any, res: Response) => {
  try {
    await issueService.deleteIssue(
      req.params.id as string,
      req.user
    )

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
}