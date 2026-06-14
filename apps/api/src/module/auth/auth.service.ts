import { eq } from "drizzle-orm";

import type { ApiResponse } from "@/types";

import { db, sc } from "@/db";
import { comparePassword } from "@/lib/hash";
import { logger } from "@/lib/log";
import { CustomErrorException } from "@/utils/errors/abstract";
import {
  InternalServerException,
  UnauthorizedException,
} from "@/utils/errors/custom";

import type { AuthRequestMap, AuthResponseMap } from "./auth.validation";
import { jwt } from "@/lib/auth";
import { TokenPayload } from "@/lib/auth/jwt/type";

export const AUTH_SERVICE = {
  LOGIN: async (
    input: AuthRequestMap["LOGIN"],
  ): Promise<ApiResponse<AuthResponseMap["LOGIN"]>> => {
    try {
      const { email, password } = input;

      // check the email existance in the database
      const userExistance = await db.query.users.findFirst({
        where: eq(sc.users.email, email),
        with: {

        }
      });
      if (!userExistance) {
        throw new UnauthorizedException("Invalid email or password");
      }

      // compare the password
      if (!(await comparePassword(password, userExistance.passwordHash))) {
        throw new UnauthorizedException("Invalid email or password");
      }

      // creating the access token and session ID
      const tokenPayload: TokenPayload = {
        id: userExistance.id,
        name: userExistance.name,
        role: {
          organization: ,
          project: ,
        },
      };
      const {} = await jwt.sign({});
    } catch (e) {
      logger.error(`Error in Auth Service - Login`);
      logger.debug(e);
      if (e instanceof CustomErrorException) {
        throw e;
      }
      throw new InternalServerException();
    }
  },

  LOGOUT: async (
    input: AuthRequestMap["LOGOUT"],
  ): Promise<ApiResponse<AuthResponseMap["LOGOUT"]>> => {},

  REFRESH: async (
    input: AuthRequestMap["REFRESH"],
  ): Promise<ApiResponse<AuthResponseMap["REFRESH"]>> => {},
} as const;
