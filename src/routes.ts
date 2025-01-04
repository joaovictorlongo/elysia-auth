import { Elysia } from "elysia";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/sign-in", async (c) => {
    return {
      message: "Sign in",
    }
  })
  .post("/sign-up", async (c) => {
    return {
      message: "Sign up",
    }
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
