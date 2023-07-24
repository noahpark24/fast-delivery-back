import { Response } from "express";

export class Responses {
  success(res: Response, message: string, statusCode?: number) {
    return res.status(statusCode || 200).send({
      error: "",
      body: message,
    });
  }

  error(res: Response, message: string, statusCode?: number) {
    return res.status(statusCode || 500).send({
      error: message,
      body: "",
    });
  }
}
