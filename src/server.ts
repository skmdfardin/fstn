import { fileURLToPath } from "url";
import { dirname } from "path";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import { join } from "path";
import apiRoutes from "./routes/api.routes.js";
import viewRoutes from "./routes/view.routes.js";
import { securityHeaders } from "./middleware/security.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(securityHeaders);

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
  console.error(err.stack);

  res.status(500).json({ success: false, message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`✨ Server running on http://localhost:${PORT}`);
});
