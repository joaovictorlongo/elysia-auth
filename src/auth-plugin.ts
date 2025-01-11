import jwt from "@elysiajs/jwt";
import Elysia, { error } from "elysia";
import { JWT_NAME } from "./core/constant";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";

export const authPlugin = new Elysia()
  .use(jwt({
    name: JWT_NAME,
    secret: process.env.JWT_SECRET!,
  }))
  .derive({ as: 'scoped' }, async ({ jwt, cookie: { accessToken } }) => {
    if (!accessToken.value) {
      return error(401, "Unauthorized");
    }
    const jwtPayload = await jwt.verify(accessToken.value);
    if (!jwtPayload) {
      return error(403, "Forbidden");
    }
    const userId = jwtPayload.sub!;
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
    if (!user) {
      return error(403, "Forbidden");
    }
    return { user };
  })
