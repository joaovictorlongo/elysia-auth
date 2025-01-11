import { Elysia, error } from "elysia";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { signinBodySchema, signupBodySchema } from "./schema";
import { jwt } from "@elysiajs/jwt";
import { handleExpireTimestamp } from "./core/util";
import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP } from "./core/constant";

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
  .post("/sign-in", async ({ body, jwt, cookie: { accessToken, refreshToken }, set }) => {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, body.email));
    if (!user) {
      return error(400, "The email or password is incorrect");
    }
    const matchPassword = await Bun.password.verify(body.password, user.password, "bcrypt");
    if (!matchPassword) {
      return error(400, "The email or password is incorrect");
    }
    const accesssJWTToken = await jwt.sign({
      sub: user.id,
      exp: handleExpireTimestamp(ACCESS_TOKEN_EXP)
    });
    accessToken.set({
      value: accesssJWTToken,
      httpOnly: true,
      maxAge: ACCESS_TOKEN_EXP,
      path: "/",
    });
    const refreshJWTToken = await jwt.sign({
      sub: user.id,
      exp: handleExpireTimestamp(REFRESH_TOKEN_EXP)
    });
    refreshToken.set({
      value: refreshJWTToken,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXP,
      path: "/",
    });
    const updatedUser = await db.update(usersTable)
      .set({ is_online: true, refresh_token: refreshJWTToken })
      .where(eq(usersTable.id, user.id)).returning({ userId: usersTable.id, isOnline: usersTable.is_online });
    return {
      message: "Sign-in successfully",
      user: updatedUser,
      accessToken: accesssJWTToken,
      refreshToken: refreshJWTToken
    }
  }, {
    body: signinBodySchema
  });
