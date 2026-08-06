import { createMiddleware } from "@tanstack/react-start";

/** Legacy middleware hook — admin auth is enforced per server function via JWT cookie. */
export const attachAdminAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
  return next();
});
