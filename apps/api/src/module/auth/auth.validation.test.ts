import { Value } from "@sinclair/typebox/value";
import { describe, expect, test } from "bun:test";

import { AUTH_REQUESTS, AUTH_RESPONSES } from "./auth.validation";

describe("auth request validation", () => {
  const sessionId = "018f0476-9d6f-7b42-a87f-5f4f4fa34c9d";

  test("accepts a valid email and strong password for login", () => {
    expect(
      Value.Check(AUTH_REQUESTS.LOGIN, {
        email: "user@example.com",
        password: "StrongPass@123",
      }),
    ).toBe(true);
  });

  test("normalizes login email to lowercase", () => {
    expect(
      Value.Decode(AUTH_REQUESTS.LOGIN, {
        email: "User.Name+Keynest@Example.COM",
        password: "StrongPass@123",
      }),
    ).toEqual({
      email: "user.name+keynest@example.com",
      password: "StrongPass@123",
    });
  });

  test("rejects login requests with invalid email formats", () => {
    const invalidEmails = [
      "plain-address",
      "missing-domain@",
      "@missing-local.com",
      "user@example",
      "user name@example.com",
    ];

    for (const email of invalidEmails) {
      expect(
        Value.Check(AUTH_REQUESTS.LOGIN, {
          email,
          password: "StrongPass@123",
        }),
      ).toBe(false);
    }
  });

  test("rejects login requests with weak passwords", () => {
    const weakPasswords = [
      "shor1A!",
      "lowercase@123",
      "UPPERCASE@123",
      "NoNumber@",
      "NoSpecial123",
      "Has Space@123",
    ];

    for (const password of weakPasswords) {
      expect(
        Value.Check(AUTH_REQUESTS.LOGIN, {
          email: "user@example.com",
          password,
        }),
      ).toBe(false);
    }
  });

  test("accepts a logout request with a login session ID", () => {
    expect(
      Value.Check(AUTH_REQUESTS.LOGOUT, {
        sessionId,
      }),
    ).toBe(true);
  });

  test("rejects logout requests without a valid session ID", () => {
    const invalidRequests = [
      {},
      { session: sessionId },
      { sessionId: "not-a-session-id" },
      { sessionId: "" },
    ];

    for (const request of invalidRequests) {
      expect(Value.Check(AUTH_REQUESTS.LOGOUT, request)).toBe(false);
    }
  });
});

describe("auth response validation", () => {
  const sessionId = "018f0476-9d6f-7b42-a87f-5f4f4fa34c9d";
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItaWQifQ.signature";

  test("accepts a login response with a JWT access token and session ID", () => {
    expect(
      Value.Check(AUTH_RESPONSES.LOGIN, {
        accessToken,
        sessionId,
      }),
    ).toBe(true);
  });

  test("rejects login responses without a JWT access token", () => {
    const invalidResponses = [
      { accessToken: "not-a-jwt", sessionId },
      { accessToken: "header.payload", sessionId },
      { accessToken: "header.payload.signature extra", sessionId },
      { accessToken: "", sessionId },
    ];

    for (const response of invalidResponses) {
      expect(Value.Check(AUTH_RESPONSES.LOGIN, response)).toBe(false);
    }
  });

  test("rejects login responses without a valid session ID", () => {
    const invalidResponses = [
      { accessToken, sessionId: "not-a-session-id" },
      { accessToken, sessionId: "" },
      { accessToken, session: sessionId },
    ];

    for (const response of invalidResponses) {
      expect(Value.Check(AUTH_RESPONSES.LOGIN, response)).toBe(false);
    }
  });
});
