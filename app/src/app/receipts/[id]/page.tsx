import { fetchReceipt, fetchAllCategories, fetchAllTags } from
"../../backend-calls.ts";
import ReceiptForm from "../receipt-form";
import { ReceiptFormAction } from "../constants";

export default async function ReceiptsIdPage(
    { params }: 
        { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const receipt = await fetchReceipt(id);
    const categories = await fetchAllCategories();
    const tags = await fetchAllTags();
    
    return (
        <div>
        <ReceiptForm 
            receipt={receipt}
            categories={categories} 
            tags={tags}
            receiptFormAction={ReceiptFormAction.Edit}
        />
        </div>
    );
};
