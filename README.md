# Fresh Install:
- ensure node 24
- `npm i` in both app and server
## Prisma in server:
- ensure PG is running
- create `.env` with set `DATABASE_URL`
- run `npx prisma migrate dev & npx prisma generate`