import type { Request, Response } from "express"
import { issueService } from "./issue.service.js"

const createIssue = async (req: any, res: Response) => {
  try {
    const result = await issueService.createIssue(req.body, req.user)

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssues(req.query)

    return res.status(200).json({
      success: true,
      message: "Issues retrieved successfully",
      data: result,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getSingleIssue(req.params.id)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: result,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const updateIssue = async (req: any, res: Response) => {
  try {
    const result = await issueService.updateIssue(
      req.params.id,
      req.body,
      req.user
    )

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result,
    })
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteIssue = async (req: any, res: Response) => {
  try {
    const result = await issueService.deleteIssue(req.params.id, req.user)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    })
  } catch (error: any) {
    return res.status(500).json({
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