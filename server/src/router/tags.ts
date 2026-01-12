import { getAllTags } from "../model/tags";
import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/all", async (_req: Request, res: Response) => {
    const tags = await getAllTags();
  res.json(tags);
});

export default router;
