import {fetchAllCategories, fetchAllTags} from "../backend-calls";
import ReceiptForm from "./receipt-form";

import { ReceiptFormAction } from "./constants";

export default async function CustomReceiptsContainer() {
    const categories = await fetchAllCategories();
    const tags = await fetchAllTags();
    const action = ReceiptFormAction.Create; 
    console.log(action);

  return (
    <div>
        <ReceiptForm 
            categories={categories} 
            tags={tags}
            receiptFormAction={action}
        />
    </div>
  );
}
