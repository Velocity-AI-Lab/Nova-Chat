import type { NextFunction, Request, Response } from "express";

export const globalErrorHnadler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // return the error body
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
