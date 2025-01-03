import { Router } from "express";
import { join } from "path";

const router = Router();

router.get("/", (req, res) => res.render("index"));
router.get("/tncs", (req, res) => res.render("tncs"));
router.get("/privacy", (req, res) => res.render("privacy"));
router.get("/manifest.json", (req, res) =>
  res.sendFile(join(__dirname, "../../public/manifest.json"))
);
router.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(join(__dirname, "../../public/robots.txt"));
});
router.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.sendFile(join(__dirname, "../../public/sitemap.xml"));
});

export default router;
