import {fetchAllCategories, fetchAllTags} from "../backend-calls";
import ReceiptForm, { ReceiptFormType } from "./receipt-form";

export default async function CustomReceiptsContainer() {
    const categories = await fetchAllCategories();
    const tags = await fetchAllTags();

  return (
    <div>
        <ReceiptForm 
            categories={categories} 
            tags={tags}
            type={ReceiptFormType.Create}
        />
    </div>
  );
}
