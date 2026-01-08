const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";

export const receiptUploadUrl = backendUrl + "/receipts/upload";
export const receiptUploadFormName = "receipt";
