import CustomReceiptForm from "./custom-receipt-form";

export default function CustomReceiptsContainer() {
    const categories = [
        "Shopping",
        "Food",
        "Transportation",
        "Activity",
        "Utilities"
    ];

    const tags = ["Vietnam 2025"];

  return (
    <div>
        <CustomReceiptForm 
            categories={categories} 
            tags={tags}
        />
    </div>
  );
}
