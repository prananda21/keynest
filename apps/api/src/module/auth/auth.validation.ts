import type { Static } from "elysia";

import { t } from "elysia";

import {
  EMAIL_PATTERN,
  JWT_PATTERN,
  STRONG_PASSWORD_PATTERN,
} from "@/constants";

// ===========================================================
//                  Auth Request Components
// ===========================================================
const LOGIN_REQUEST = t.Object({
  email: t
    .Transform(
      t.String({
        format: "email",
        maxLength: 320,
        pattern: EMAIL_PATTERN,
        error: "Email must be a valid email address",
        examples: ["user@example.com"],
      }),
    )
    .Decode((email) => email.toLowerCase())
    .Encode((email) => email),
  password: t.String({
    minLength: 8,
    maxLength: 255,
    pattern: STRONG_PASSWORD_PATTERN,
    error:
      "Password must contain uppercase, lowercase, number, and special character",
    examples: ["PasswordPalingRahasia@00"],
  }),
});

const SESSION_ID_REQUEST = t.Object({
  sessionId: t.String({
    format: "uuid",
    error: "Session ID must be a valid UUID",
    examples: ["018f0476-9d6f-7b42-a87f-5f4f4fa34c9d"],
  }),
});

// ===========================================================
//                  Auth Response Components
// ===========================================================
const LOGIN_RESPONSE = t.Object({
  accessToken: t.String({
    pattern: JWT_PATTERN,
    error: "Access token must be a valid JWT",
    examples: [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItaWQifQ.signature",
    ],
  }),
  sessionId: t.String({
    format: "uuid",
    error: "Session ID must be a valid UUID",
    examples: ["018f0476-9d6f-7b42-a87f-5f4f4fa34c9d"],
  }),
});

const LOGOUT_RESPONSE = t.Null();

/**
 * Request body schemas for auth endpoints.
 *
 * `LOGOUT` and `REFRESH` both require the session ID issued during login.
 */
export const AUTH_REQUESTS = {
  LOGIN: LOGIN_REQUEST,
  LOGOUT: SESSION_ID_REQUEST,
  REFRESH: SESSION_ID_REQUEST,
} as const;
export type AuthRequestMap = {
  [K in keyof typeof AUTH_REQUESTS]: Static<(typeof AUTH_REQUESTS)[K]>;
};

export const AUTH_RESPONSES = {
  LOGIN: LOGIN_RESPONSE,
  LOGOUT: LOGOUT_RESPONSE,
  REFRESH: LOGIN_RESPONSE,
} as const;
export type AuthResponseMap = {
  [K in keyof typeof AUTH_RESPONSES]: Static<(typeof AUTH_RESPONSES)[K]>;
};
