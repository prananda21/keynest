import { describe, expect, test } from "bun:test";

import { app } from "./auth.handler";

describe("auth handler OpenAPI details", () => {
  test("documents login, logout, and refresh routes", () => {
    const detailsByPath = new Map(
      app.routes.map((route) => [route.path, route.hooks.detail]),
    );

    expect(detailsByPath.get("/auth/login")).toMatchObject({
      operationId: "login",
      summary: "Login with email and password",
      tags: ["Auth"],
    });
    expect(detailsByPath.get("/auth/logout")).toMatchObject({
      operationId: "logout",
      summary: "Logout from a session",
      tags: ["Auth"],
    });
    expect(detailsByPath.get("/auth/refresh")).toMatchObject({
      operationId: "refreshSession",
      summary: "Refresh access token",
      tags: ["Auth"],
    });
  });
});
