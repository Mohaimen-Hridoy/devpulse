import type { Request, Response, NextFunction } from "express"
import { userService } from "./user.service.js"

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body)

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.loginUser(req.body)

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    })
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    })
  }
}

export const userController = {
  createUser,
  loginUser,
}