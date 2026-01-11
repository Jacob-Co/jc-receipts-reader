import { receiptUrl, categoryUrl, tagUrl } from "./backend-constants";
import { ReceiptDto, CategoryDto, TagDto } from "./backend-types.ts"

export async function fetchReceipt(id: number): Promise<ReceiptDto> {
    const receiptRes = await fetch(receiptUrl + `/${id}`);
    return await receiptRes.json();
}

export async function fetchAllCategories(): Promise<CategoryDto[]> {
    const categoriesRes  = await fetch(categoryUrl + "/all");
    return await categoriesRes.json();
}

export async function fetchAllTags(): Promise<TagDto[]> {
    const tagsRes = await fetch(tagUrl + "/all");
    return await tagsRes.json();
}
