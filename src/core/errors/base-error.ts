export abstract class BaseError extends Error {
  public readonly errorCode: string
  public readonly errorDescription: string

  constructor(errorCode: string, errorDescription: string) {
    super(errorDescription)
    this.errorCode = errorCode
    this.errorDescription = errorDescription
  }
}
