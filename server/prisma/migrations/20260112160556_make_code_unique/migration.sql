/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_code_key" ON "Link"("code");
