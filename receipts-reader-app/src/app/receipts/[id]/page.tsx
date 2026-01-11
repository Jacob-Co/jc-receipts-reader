import { receiptUrl, categoryUrl, tagUrl } from "../../backend-constants";

export default async function ReceiptsIdPage(
    { params }: 
        { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const receiptRes = await fetch(receiptUrl + `/${id}`);
    const receipt = await receiptRes.json();
    const categoriesRes  = await fetch(categoryUrl + "/all");
    const categories = await categoriesRes.json();
    const tagsRes = await fetch(tagUrl + "/all");
    const tags = await tagsRes.json();
    
    return (
        <div>
            {id}
            {JSON.stringify(receipt)}
            {JSON.stringify(categories)}
            {JSON.stringify(tags)}
        </div>
    );
};
