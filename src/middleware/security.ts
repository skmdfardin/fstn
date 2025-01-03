import { Request, Response, NextFunction } from "express";

export const securityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
};
