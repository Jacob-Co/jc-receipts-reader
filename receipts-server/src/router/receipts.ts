import {randomUUID} from "crypto";
import path from "path";
import fs from "fs";
import { Router, type Request, type Response } from "express";
import multer from "multer";

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
      const uuid = randomUUID();
      req.res.locals.uuid = uuid;
    cb(null, uuid + fileExt);
  }
});
const upload = multer({ storage: storage });

const router = Router();

router.post("/upload", upload.single("receipt"), (req: Request, res: Response) => {
  res.json({ id: res.locals.uuid });
});

export default router;
