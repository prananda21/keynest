import { beforeAll, describe, expect, test } from "bun:test";

import { ORGANIZATION_ROLES, PROJECT_ROLES } from "@/constants";

import type { TokenPayload } from "./type";

const jwtSecret =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

describe("JWT", () => {
  beforeAll(() => {
    Bun.env.NODE_ENV = "local";
    Bun.env.PORT = "3001";
    Bun.env.JWT_SECRET = jwtSecret;
  });

  test("signs and verifies an access token payload", async () => {
    const { jwt } = await import("./service");
    const payload: TokenPayload = {
      id: "user-id",
      name: "Keynest User",
      role: {
        organization: ORGANIZATION_ROLES.OWNER,
        project: PROJECT_ROLES.ADMIN,
      },
    };

    const token = await jwt.sign(payload);
    const verifiedPayload = await jwt.verify(token);

    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3);
    expect(verifiedPayload).toEqual(payload);
  });
});
