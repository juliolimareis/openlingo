import { PrismaClient, } from "@prisma/client";

declare global {
  var db: PrismaClient;
}

export default defineEventHandler(() => {
  if(!global.db) global.db = new PrismaClient();
});