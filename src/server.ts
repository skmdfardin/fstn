import { fileURLToPath } from "url";
import { dirname } from "path";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import { join } from "path";
import morgan from "morgan";
import winston from "winston";
import apiRoutes from "./routes/api.routes.js";
import viewRoutes from "./routes/view.routes.js";
import { securityHeaders } from "./middleware/security.js";

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Add console transport if not in production
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(securityHeaders);

// Add Morgan middleware
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use(
  compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  })
);

// Static files & caching
app.use(express.static("public", { maxAge: "1y", etag: true }));

app.use(
  "/assets",
  express.static("public/assets", { maxAge: "1y", etag: true })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// View engine setup
app.set("view engine", "ejs");
app.set("views", join(__dirname, "../views"));

// Routes
app.use("/api", apiRoutes);
app.use("/", viewRoutes);

// Error handling middleware must be defined last
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Error:", { error: err.message, stack: err.stack });
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

app.listen(PORT, () => {
  logger.info(`✨ Server running on http://localhost:${PORT}`);
});
