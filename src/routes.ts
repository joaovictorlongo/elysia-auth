import { Elysia, error } from "elysia";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { signinBodySchema, signupBodySchema } from "./schema";
import { jwt } from "@elysiajs/jwt";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(jwt({
    secret: process.env.JWT_SECRET!,
  }))
  .post("/sign-up", async ({ body }) => {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, body.email));
    if (user.length) {
      return error(400, "User already exists");
    }
    const password = await Bun.password.hash(body.password, {
      algorithm: "bcrypt",
      cost: 10
    });
    const newUser: typeof usersTable.$inferInsert = {
      email: body.email,
      name: body.name,
      role: body.roleIsAdmin ? "admin" : "user",
      password
    };
    const userInserted = await db.insert(usersTable).values(newUser).returning({ userId: usersTable.id});
    return {
      message: "Sign up success",
      user: userInserted
    }
  }, {
    body: signupBodySchema
  })
  .post("/sign-in", async ({ body }) => {

    return {
      message: "Sign in",
    }
  }, {
    body: signinBodySchema
  })
  .post("/refresh", async (c) => {
    return {
      message: "Refresh token",
    }
  })
  .post("/logout", async (c) => {
    return {
      message: "Logout",
    }
  })
  .get("/me", async (c) => {
    return {
      message: "User info",
    }
  });
