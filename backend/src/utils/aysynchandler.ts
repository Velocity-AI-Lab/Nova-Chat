import type { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncHandler =
  (requesthandler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err));
  };
