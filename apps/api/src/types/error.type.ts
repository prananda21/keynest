import type {
  HTTP_CLIENT_ERROR_CODE,
  HTTP_SERVER_ERROR_CODE,
  HTTP_SUCCESS_CODE,
} from "@/constants";

type ValueOf<T> = T[keyof T];

type HttpSuccessCode = keyof typeof HTTP_SUCCESS_CODE;
type HttpClientErrorCode = keyof typeof HTTP_CLIENT_ERROR_CODE;
type HttpServerErrorCode = keyof typeof HTTP_SERVER_ERROR_CODE;

export type HttpCode =
  | HttpSuccessCode
  | HttpClientErrorCode
  | HttpServerErrorCode;

type HttpSuccessMessage = ValueOf<typeof HTTP_SUCCESS_CODE>;
type HttpClientErrorMessage = ValueOf<typeof HTTP_CLIENT_ERROR_CODE>;
type HttpServerErrorMessage = ValueOf<typeof HTTP_SERVER_ERROR_CODE>;

export type HttpMessage =
  | HttpSuccessMessage
  | HttpClientErrorMessage
  | HttpServerErrorMessage;
