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
    return convertToJsObj(createdReceipt);
};

export async function getReceipt(id: number) {
    const db = getDbClient();
    const receipt = await db.receipt.findUnique({ where: { id } });
    return convertToJsObj(receipt);
};

function convertToJsObj(receipt: {date: bigint}) {
    receipt.date = Number(receipt.date);
    return receipt;
}
