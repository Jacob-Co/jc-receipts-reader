import {customReceiptPostUrl} from "../backend-constants";
import CustomReceiptForm from "./custom-receipt-form";

export type CustomReceipt = {
    date: number | null,
    total: number | null,
    tag: string | null,
    category: string | null
}

export default function CustomReceiptsContainer() {
    const uploadCustomReceipt = async (receipt: CustomReceipt) => {
        if (
            receipt.date === null || 
            receipt.total === null || 
            receipt.tag === null || 
            receipt.category === null
            ) 
        {
            return;
        }

        await fetch(customReceiptPostUrl, {
            method: "POST",
            body: JSON.stringify({
                imageId: null,
                date: receipt.date,
                total: receipt.total,
                tag: receipt.tag,
                category: receipt.category,
            })
        });

    };

  return (
    <div>
        <CustomReceiptForm />
    </div>
  );
}
