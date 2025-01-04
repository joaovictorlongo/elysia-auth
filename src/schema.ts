import { t } from "elysia";

export const signupBodySchema = t.Object({
  name: t.String({ maxLength: 255, minLength: 1 }),
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
  roleIsAdmin: t.Boolean(),
})

export const signinBodySchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
});
