export type ReceiptDto = {
    id: number,
    imageId: string | null,
    date: number,
    total: number,
    categoryId: number,
    tagId: number,
};

export type CreateReceiptDto = Omit<ReceiptDto, "id">;

export type TagDto = {
    id: number,
    name: string,
};

export type CategoryDto = {
    id: number,
    name: string,
};
