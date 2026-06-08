import bearer from "@elysia/bearer";
import Elysia from "elysia";

import { jwt } from "@/lib/auth";
import { UnauthorizedException } from "@/utils/errors/custom";

export const authMiddleware = new Elysia({ name: "Auth Middleware" })
  .use(bearer())
  .resolve({ as: "global" }, async ({ bearer }) => {
    if (!bearer) {
      throw new UnauthorizedException("Missing bearer access token");
    }

    const currentUser = await jwt.verify(bearer);

    return {
      currentUser,
    };
  });
