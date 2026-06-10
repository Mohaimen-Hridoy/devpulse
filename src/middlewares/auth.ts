import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import config from "../config/index.js"

export const auth = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      })
    }

    try {
      const decoded = jwt.verify(token, config.jwt_secret)

      req.user = decoded as any

      if (
        roles.length &&
        !roles.includes((decoded as any).role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        })
      }

      next()
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      })
    }
  }
}