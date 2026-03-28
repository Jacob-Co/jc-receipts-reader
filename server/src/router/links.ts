// import { saveReceipt, getReceipt } from "../model/receipts";
import { Router, type Request, type Response } from "express";
import {randomUUID} from "crypto";
import z from "zod";
import { getLink, incrementClick, saveLink } from "../model/links";


const codeValidator = z.stringFormat("no-spaces", (val: string) => {
    return !val.includes(" ");
  })

const createLinkValidator = z.object({
  url: z.url(),
  code: codeValidator.optional()
});

const router = Router();


router.post("/api/links", async (req: Request, res: Response) => {
    const validBody = createLinkValidator.parse(req.body);
    const validCode = validBody.code ?? randomUUID();

    const createLinkInput = {
      url: validBody.url,
      code: validCode,
      shortUrl: new URL(validBody.url).hostname + "/s/" + validCode, 
      clicks: 0,
      createdAt: Date.now()
    }

    const createdLink = await saveLink(createLinkInput);
    res.json(createdLink);
});

router.get("/api/links/:code", async (req: Request, res: Response) => {
  try {
    const validCode = codeValidator.parse(req.params.code);
    const receipt = await getLink(validCode);
    res.json(receipt);
  } catch {
    res.status(404);
    res.json({
      error: "Cannot find link with that code"
    })
  }
});

router.get("/s/:code", async (req: Request, res: Response) => {
  try {
    const validCode = codeValidator.parse(req.params.code);
    const link = await incrementClick(validCode);
    res.status(301);
    res.location(link.url);
    res.end();
  } catch {
    res.status(404);
    res.json({
      error: "Cannot find link with that code"
    })
  }
});

export default router;

