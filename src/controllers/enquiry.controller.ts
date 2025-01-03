import { Request, Response } from "express";
import { createEnquiry } from "../models/enquiry.model.js";

export const submitEnquiry = (req: Request, res: Response) => {
  try {
    const result = createEnquiry(req.body);

    console.log("Stored enquiry:", req.body);
    console.log("Database insert ID:", result.lastInsertRowid);

    res.status(200).json({
      success: true,
      message: "Enquiry stored successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to store enquiry",
    });
  }
};
