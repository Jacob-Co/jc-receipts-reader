import { fetchReceipt, fetchAllCategories, fetchAllTags } from
"../../backend-calls.ts";

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
            {id}
            {JSON.stringify(receipt)}
            {JSON.stringify(categories)}
            {JSON.stringify(tags)}
        </div>
    );
};
