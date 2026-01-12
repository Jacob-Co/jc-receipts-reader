import { saveReceipt, getReceipt } from "../model/receipts";
import { CreateReceiptValidator } from "../validator";
import { createFileStorerMiddleware } from "../util/local-file-storage";
import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/upload", createFileStorerMiddleware("uploads", "receipt"), (req: Request, res: Response) => {
  res.json({ id: res.locals.uuid });
});

router.post("/custom", async (req: Request, res: Response) => {
    const receiptInput = CreateReceiptValidator.parse(req.body);
    const createdReceipt = await saveReceipt(receiptInput);
    res.json(createdReceipt);
});

router.get("/:id", async (req: Request, res: Response) => {
    const receipt = await getReceipt(Number(req.params.id));
    res.json(receipt);
});

export default router;
