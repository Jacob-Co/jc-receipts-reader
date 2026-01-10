import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../generated/prisma/client';

let dbClient: any = null;

export function getDbClient() {
   return dbClient; 
}

export function initializeDb() {
    const connectionString = process.env.DATABASE_URL;
    const adapter = new PrismaPg({ connectionString});
    dbClient = new PrismaClient({ adapter });
}

export async function initializeDefaultCategories() {
    const db = getDbClient();
    await db.category.createMany({
        data: [
            {name: "Shopping"},
            {name: "Food"},
            {name: "Transportation"},
            {name: "Activity"},
            {name: "Utilities"}
        ],
        skipDuplicates: true,
    });
}

export async function initializeTestTag() {
    const db = getDbClient();
    try {
        await db.category.create({
            data: { name: "Vietname 2025"}
        });
    } catch {
        console.log("Has Test Tag");
    }
}

