import type { HttpCode } from "@/types/error.type";

export type CustomErrorOptions = {
  cause?: unknown;
  details?: unknown;
};

export type CustomErrorResponse = {
  code: string;
  details?: unknown;
  message: string;
  statusCode: HttpCode;
};

export abstract class CustomErrorException extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: HttpCode;

  readonly details?: unknown;

  protected constructor(message: string, options: CustomErrorOptions = {}) {
    super(message, { cause: options.cause });

    this.name = new.target.name;
    this.details = options.details;
  }

  get status(): number {
    return Number(this.statusCode);
  }

  toJSON(): CustomErrorResponse {
    return {
      code: this.code,
      ...(this.details === undefined ? {} : { details: this.details }),
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
