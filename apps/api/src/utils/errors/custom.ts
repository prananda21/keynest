import { HTTP_CLIENT_ERROR_CODE, HTTP_SERVER_ERROR_CODE } from "@/constants";
import { CustomErrorException } from "./abstract";

export class BadRequestException extends CustomErrorException {
  readonly statusCode = 400;
  readonly code = HTTP_CLIENT_ERROR_CODE[400];

  constructor(message: string) {
    super(message);
  }
}
export class UnauthorizedException extends CustomErrorException {
  readonly statusCode = 401;
  readonly code = HTTP_CLIENT_ERROR_CODE[401];

  constructor(message: string) {
    super(message);
  }
}
export class PaymentRequiredException extends CustomErrorException {
  readonly statusCode = 402;
  readonly code = HTTP_CLIENT_ERROR_CODE[402];

  constructor(message: string) {
    super(message);
  }
}
export class ForbiddenException extends CustomErrorException {
  readonly statusCode = 403;
  readonly code = HTTP_CLIENT_ERROR_CODE[403];

  constructor(message: string) {
    super(message);
  }
}
export class NotFoundException extends CustomErrorException {
  readonly statusCode = 404;
  readonly code = HTTP_CLIENT_ERROR_CODE[404];

  constructor(message: string) {
    super(message);
  }
}
export class MethodNotAllowedException extends CustomErrorException {
  readonly statusCode = 405;
  readonly code = HTTP_CLIENT_ERROR_CODE[405];

  constructor(message: string) {
    super(message);
  }
}
export class NotAcceptableException extends CustomErrorException {
  readonly statusCode = 406;
  readonly code = HTTP_CLIENT_ERROR_CODE[406];

  constructor(message: string) {
    super(message);
  }
}
export class ProxyAuthenticationRequiredException extends CustomErrorException {
  readonly statusCode = 407;
  readonly code = HTTP_CLIENT_ERROR_CODE[407];

  constructor(message: string) {
    super(message);
  }
}
export class RequestTimeoutException extends CustomErrorException {
  readonly statusCode = 408;
  readonly code = HTTP_CLIENT_ERROR_CODE[408];

  constructor(message: string) {
    super(message);
  }
}
export class ConflictException extends CustomErrorException {
  readonly statusCode = 409;
  readonly code = HTTP_CLIENT_ERROR_CODE[409];

  constructor(message: string) {
    super(message);
  }
}
export class GoneException extends CustomErrorException {
  readonly statusCode = 410;
  readonly code = HTTP_CLIENT_ERROR_CODE[410];

  constructor(message: string) {
    super(message);
  }
}
export class LengthRequiredException extends CustomErrorException {
  readonly statusCode = 411;
  readonly code = HTTP_CLIENT_ERROR_CODE[411];

  constructor(message: string) {
    super(message);
  }
}
export class PreconditionFailedException extends CustomErrorException {
  readonly statusCode = 412;
  readonly code = HTTP_CLIENT_ERROR_CODE[412];

  constructor(message: string) {
    super(message);
  }
}
export class ContentTooLargeException extends CustomErrorException {
  readonly statusCode = 413;
  readonly code = HTTP_CLIENT_ERROR_CODE[413];

  constructor(message: string) {
    super(message);
  }
}
export class UriTooLongException extends CustomErrorException {
  readonly statusCode = 414;
  readonly code = HTTP_CLIENT_ERROR_CODE[414];

  constructor(message: string) {
    super(message);
  }
}

export class InternalServerException extends CustomErrorException {
  readonly statusCode = 500;
  readonly code = HTTP_SERVER_ERROR_CODE[500];

  constructor(message?: string) {
    super(message ?? "Something went wrong, please try again later");
  }
}
export class NotImplementedException extends CustomErrorException {
  readonly statusCode = 501;
  readonly code = HTTP_SERVER_ERROR_CODE[501];

  constructor(message?: string) {
    super(message ?? "Service not implemented yet, please try again later");
  }
}
export class BadGatewayException extends CustomErrorException {
  readonly statusCode = 502;
  readonly code = HTTP_SERVER_ERROR_CODE[502];

  constructor(message?: string) {
    super(message ?? "Bad Gateway, please try again later");
  }
}
export class ServiceUnavailableException extends CustomErrorException {
  readonly statusCode = 503;
  readonly code = HTTP_SERVER_ERROR_CODE[503];

  constructor(message?: string) {
    super(message ?? "Service unavailable, please try again later");
  }
}
export class GatewayTimeout extends CustomErrorException {
  readonly statusCode = 504;
  readonly code = HTTP_SERVER_ERROR_CODE[504];

  constructor(message?: string) {
    super(message ?? "Gateway Timeout, please try again later");
  }
}
