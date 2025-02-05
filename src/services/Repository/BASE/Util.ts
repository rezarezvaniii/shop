import { HandlerError as REPO_BASE_HandlerError } from "./ErrorHandler";

export enum PaginationType {
  next = "next",
  previous = "previous",
}

export class Util {
  static generateUUID(): string {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  static dataSourceErrorHandler(error: any, actionID: number) {
    if (error.message.includes("NetworkError")) {
      throw new REPO_BASE_HandlerError(
        "networkError",
        actionID * 100,
        "اتصال اینترنت خود را بررسی کنید."
      );
    } else if (error.message.includes("400")) {
      throw new REPO_BASE_HandlerError(
        "badRequest",
        actionID * 100 + 2,
        "اطلاعات ارسالی نامعتبر است."
      );
    } else if (error.message.includes("401")) {
      throw new REPO_BASE_HandlerError(
        "unauthorized",
        actionID * 100 + 3,
        "شناسه کاربری یا رمز عبور نامعتبر است."
      );
    } else if (error.message.includes("403")) {
      throw new REPO_BASE_HandlerError(
        "forbidden",
        actionID * 100 + 4,
        "شما مجوز لازم برای انجام این عملیات را ندارید."
      );
    } else if (error.message.includes("404")) {
      throw new REPO_BASE_HandlerError(
        "notFound",
        actionID * 100 + 5,
        "مورد مورد نظر یافت نشد."
      );
    } else if (error.message.includes("500")) {
      throw new REPO_BASE_HandlerError(
        "internalServerError",
        actionID * 100 + 6,
        "خطایی در سمت سرور رخ داده است."
      );
    } else {
      throw new REPO_BASE_HandlerError(
        "networkError",
        actionID * 100 + 1,
        "اتصال اینترنت خود را بررسی کنید."
      );
    }
  }

  static getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }
}
