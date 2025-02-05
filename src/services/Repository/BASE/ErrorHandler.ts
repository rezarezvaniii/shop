export class HandlerError extends Error {
  private erroreType: string;
  private errorCode: number;
  private errorText: string;

  constructor(erroreType: string, errorCode: number, errorText: string) {
    super(errorText);
    this.erroreType = erroreType;
    this.errorCode = errorCode;
    this.errorText = errorText;
  }

  getErrorType() {
    return this.erroreType;
  }

  getErrorCode(): number {
    return this.errorCode;
  }

  getErrorText(): string {
    return this.errorText;
  }
}
