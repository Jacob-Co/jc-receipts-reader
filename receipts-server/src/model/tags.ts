import { getDbClient } from "./init";

export async function getAllTags() {
    const db = getDbClient();
    const tags = await db.tag.findMany();
    return tags;
}
