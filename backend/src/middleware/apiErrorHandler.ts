import { NextFunction, Request, Response } from "express";
import ApiError from "../utlities/ApiError";

const apiErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    // Caught errors
    res.status(error.code).json({ message: error.message });
    return;
  } else if (error instanceof Error) {
    // Unexpected errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } else {
    // Other errors
    console.error("Unknown error:", error);
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

export default apiErrorHandler;
