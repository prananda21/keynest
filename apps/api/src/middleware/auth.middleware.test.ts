import { beforeAll, describe, expect, test } from "bun:test";
import Elysia from "elysia";

import { ORGANIZATION_ROLES, PROJECT_ROLES } from "@/constants";

const jwtSecret =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

describe("authMiddleware", () => {
  beforeAll(() => {
    Bun.env.DB_URL = "postgres://keynest:keynest@localhost:5432/keynest";
    Bun.env.JWT_SECRET = jwtSecret;
    Bun.env.NODE_ENV = "local";
    Bun.env.PORT = "3001";
  });

  test("resolves the current user from a bearer access token", async () => {
    const { jwt } = await import("@/lib/auth");
    const { authMiddleware } = await import("./auth.middleware");
    const payload = {
      id: "user-id",
      name: "Keynest User",
      role: {
        organization: ORGANIZATION_ROLES.OWNER,
        project: PROJECT_ROLES.ADMIN,
      },
    };
    const accessToken = await jwt.sign(payload);
    const app = new Elysia()
      .use(authMiddleware)
      .get("/protected", ({ currentUser }) => currentUser);

    const response = await app.handle(
      new Request("http://localhost/protected", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(payload);
  });

  test("rejects requests without a bearer access token", async () => {
    const { authMiddleware } = await import("./auth.middleware");
    const app = new Elysia()
      .use(authMiddleware)
      .get("/protected", ({ currentUser }) => currentUser);

    const response = await app.handle(
      new Request("http://localhost/protected"),
    );

    expect(response.status).toBe(401);
  });

  test("rejects requests with an invalid bearer access token", async () => {
    const { authMiddleware } = await import("./auth.middleware");
    const app = new Elysia()
      .use(authMiddleware)
      .get("/protected", ({ currentUser }) => currentUser);

    const response = await app.handle(
      new Request("http://localhost/protected", {
        headers: {
          authorization: "Bearer invalid-token",
        },
      }),
    );

    expect(response.status).toBe(401);
  });
});
