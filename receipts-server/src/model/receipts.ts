import { ReceiptEntity } from "../entities";
import { getDbClient } from "./init";
import { type ReceiptUncheckedCreateInput } from "../generated/prisma/models/Receipt";

export async function saveReceipt(receipt: ReceiptUncheckedCreateInput): Promise<string> {
    const db = getDbClient();
    const createdReceipt = await db.receipt.create({
        data: receipt
    });
    return createdReceipt.id;
};
