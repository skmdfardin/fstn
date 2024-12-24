import express, { Request, Response, NextFunction } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";
import compression from "compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(compression());

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", join(__dirname, "../views"));
// Static files middleware
app.use(express.static(join(__dirname, "../public")));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.render("index");
});
app.get("/tncs", (req, res) => {
  res.render("tncs");
});
app.get("/privacy", (req, res) => {
  res.render("privacy");
});

// API endpoints
app.post("/api/enquiry", (req: Request, res: Response) => {
  try {
    const enquiryData = req.body;
    console.log("Received enquiry:", enquiryData);
    res.status(200).json({
      success: true,
      message: "Enquiry received successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process enquiry",
    });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✨ Server running on http://localhost:${PORT}`);
});
