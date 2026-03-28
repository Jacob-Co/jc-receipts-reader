export const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";

export const receiptUrl = backendUrl + "/receipts";
export const receiptUploadUrl = backendUrl + "/receipts/upload";
export const receiptUploadFormName = "receipt";

export const customReceiptPostUrl = backendUrl + "/receipts/custom";

export const categoryUrl = backendUrl + "/categories";

export const tagUrl = backendUrl + "/tags";
