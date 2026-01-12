import multer from "multer";
import {randomUUID} from "crypto";
import path from "path";
import fs from "fs";

export function createFileStorerMiddleware(savePath: string, fileKey: string) {
    const uploadDir = path.join(process.cwd(), savePath);

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
    return upload.single(fileKey);
}
