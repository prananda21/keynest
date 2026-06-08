import { describe, expect, test } from "bun:test";

import { hashPassword } from "./service";

describe("hashPassword", () => {
  test("uses Argon2id parameters for password hashing", async () => {
    const hash = await hashPassword("StrongPass@123");

    expect(hash).toStartWith("$argon2id$");
    expect(hash).toContain("m=65536,t=3");
  });
});
