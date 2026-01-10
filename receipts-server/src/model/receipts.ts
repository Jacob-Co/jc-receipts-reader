import { ReceiptEntity } from "../entities";
import { getDbClient } from "./init";
import { type ReceiptUncheckedCreateInput } from "../generated/prisma/models/Receipt";

export async function saveReceipt(receipt: ReceiptUncheckedCreateInput) {
    const db = getDbClient();
    const createdReceipt = await db.receipt.create({
        data: receipt,
        include: {
            category: true,
            tag: true,
        }
    });
    return createdReceipt;
};
