import Elysia from "elysia";

import { NotImplementedException } from "@/utils/errors/custom";

import { AUTH_REQUESTS, AUTH_RESPONSES } from "./auth.validation";

export const app = new Elysia({ name: "Auth Handler" }).group("/auth", (app) =>
  app
    .post(
      "/login",
      async () => {
        throw new NotImplementedException("Login is not implemented yet");
      },
      {
        body: AUTH_REQUESTS.LOGIN,
        detail: {
          description:
            "Authenticates a user with email and password, then returns a short-lived JWT access token and the session ID used for refresh and logout operations.",
          operationId: "login",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    email: {
                      description: "User email address.",
                      format: "email",
                      type: "string",
                    },
                    password: {
                      description:
                        "Strong password with uppercase, lowercase, number, and special character.",
                      type: "string",
                    },
                  },
                  required: ["email", "password"],
                  type: "object",
                },
              },
            },
            description:
              "User credentials. The email must be a valid email address and the password must satisfy the configured strong-password policy.",
            required: true,
          },
          responses: {
            200: {
              description:
                "Authentication succeeded. The response includes a JWT access token and a UUID session ID.",
            },
            400: {
              description:
                "The request body failed validation for email or password format.",
            },
            401: {
              description:
                "The credentials are invalid or the user is disabled.",
            },
          },
          summary: "Login with email and password",
          tags: ["Auth"],
        },
        response: {
          200: AUTH_RESPONSES.LOGIN,
        },
      },
    )
    .post(
      "/logout",
      async () => {
        throw new NotImplementedException("Logout is not implemented yet");
      },
      {
        detail: {
          description:
            "Revokes the active session identified by the session ID issued during login. After logout, the session can no longer be used to refresh access tokens.",
          operationId: "logout",
          parameters: [
            {
              description: "UUID session ID returned by the login endpoint.",
              in: "header",
              name: "sessionId",
              required: true,
              schema: {
                format: "uuid",
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description:
                "Logout succeeded and the session was revoked. The response body is null.",
            },
            400: {
              description: "The session ID header is missing or invalid.",
            },
            401: {
              description: "The session does not exist or is no longer active.",
            },
          },
          summary: "Logout from a session",
          tags: ["Auth"],
        },
        headers: AUTH_REQUESTS.LOGOUT,
        response: { 200: AUTH_RESPONSES.LOGOUT },
      },
    )
    .post(
      "/refresh",
      async () => {
        throw new NotImplementedException(
          "Session refresh is not implemented yet",
        );
      },
      {
        detail: {
          description:
            "Uses an active session ID to issue a new JWT access token. The returned session ID remains the session identifier for future refresh and logout requests.",
          operationId: "refreshSession",
          parameters: [
            {
              description: "UUID session ID returned by the login endpoint.",
              in: "header",
              name: "sessionId",
              required: true,
              schema: {
                format: "uuid",
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description:
                "Refresh succeeded. The response includes a new JWT access token and the session ID.",
            },
            400: {
              description: "The session ID header is missing or invalid.",
            },
            401: {
              description:
                "The session does not exist, expired, or was revoked.",
            },
          },
          summary: "Refresh access token",
          tags: ["Auth"],
        },
        headers: AUTH_REQUESTS.REFRESH,
        response: { 200: AUTH_RESPONSES.REFRESH },
      },
    ),
);
