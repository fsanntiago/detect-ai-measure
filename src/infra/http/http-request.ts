export type HttpRequest<
  TBody = any,
  TParams = any,
  TQuery = any,
  THeaders = any,
> = {
  body?: TBody
  params?: TParams
  query?: TQuery
  headers?: THeaders
}
