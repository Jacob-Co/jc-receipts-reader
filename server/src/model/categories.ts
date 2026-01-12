import { getDbClient } from "./init";

export async function getAllCategories() {
    const db = getDbClient();
    const category = await db.category.findMany();
    return category;
}
