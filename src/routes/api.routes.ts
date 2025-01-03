import { Router } from "express";
import { submitEnquiry } from "../controllers/enquiry.controller.js";

const router = Router();

router.post("/enquiry", submitEnquiry);

export default router;
