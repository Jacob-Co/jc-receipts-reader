import { getDbClient } from "./init";
import { LinkUncheckedCreateInput} from "../generated/prisma/models";

export async function saveLink(link: LinkUncheckedCreateInput) {
    const db = getDbClient();
    const createdLink = await db.link.create({
        data: link
    });
    
    createdLink.createdAt = Number(createdLink.createdAt);
    return createdLink;
};

export async function getLink(code: string) {
    const db = getDbClient();
    const link = await db.link.findUnique({ where: { code } });
    link.createdAt = Number(link.createdAt);
    return link;
};

export async function incrementClick(code: string) {
    const db = getDbClient();
    return await db.link.update({
      where: {code},
      data: {
        clicks: {
          increment: 1
        }
      },
      select: {
        url: true
      }
    })
}

