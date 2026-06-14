import type { JWTPayload } from "jose";

import { jwtVerify, SignJWT } from "jose";

import { CONFIG } from "@/config";
import { ORGANIZATION_ROLES, PROJECT_ROLES } from "@/constants";
import { UnauthorizedException } from "@/utils/errors/custom";

import type { TokenPayload } from "./type";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const ORGANIZATION_ROLE_VALUES: readonly string[] =
  Object.values(ORGANIZATION_ROLES);
const PROJECT_ROLE_VALUES: readonly string[] = Object.values(PROJECT_ROLES);

class JWT {
  private readonly SECRET: Uint8Array;
  private readonly JWT_ISSUER = "keynest-api";

  constructor() {
    this.SECRET = Uint8Array.from(
      CONFIG.JWT_SECRET.match(/.{2}/g) ?? [],
      (byte) => Number.parseInt(byte, 16),
    );
  }

  sign = async (payload: TokenPayload): Promise<string> => {
    return new SignJWT(payload as unknown as JWTPayload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuer(this.JWT_ISSUER)
      .setSubject(payload.id)
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
      .sign(this.SECRET);
  };

  verify = async (token: string): Promise<TokenPayload> => {
    try {
      const { payload } = await jwtVerify(token, this.SECRET, {
        issuer: this.JWT_ISSUER,
      });

      return this.toTokenPayload(payload);
    } catch {
      throw new UnauthorizedException("Invalid or expired access token");
    }
  };

  private toTokenPayload = (payload: JWTPayload): TokenPayload => {
    if (!this.isTokenPayload(payload)) {
      throw new UnauthorizedException("Invalid access token payload");
    }

    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
    };
  };

  private isTokenPayload = (
    payload: JWTPayload,
  ): payload is JWTPayload & TokenPayload => {
    const role = payload.role;

    if (typeof role !== "object" || role === null) {
      return false;
    }

    const organizationRole = "organization" in role ? role.organization : null;
    const projectRole = "project" in role ? role.project : null;

    return (
      typeof payload.id === "string" &&
      typeof payload.name === "string" &&
      typeof organizationRole === "string" &&
      typeof projectRole === "string" &&
      ORGANIZATION_ROLE_VALUES.includes(organizationRole) &&
      PROJECT_ROLE_VALUES.includes(projectRole)
    );
  };
}

export const jwt = new JWT();
