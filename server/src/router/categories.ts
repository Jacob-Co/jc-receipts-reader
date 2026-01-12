import { getAllCategories } from "../model/categories";
import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/all", async (_req: Request, res: Response) => {
    const categories = await getAllCategories();
  res.json(categories);
});

export default router;
