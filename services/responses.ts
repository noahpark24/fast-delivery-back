import { Response } from 'express';
import { PackageInterface } from '../interfaces/package.interfaces';

export class Responses {
  success(res: Response, message: string, statusCode?: number) {
    return res.status(statusCode || 200).send({
      body: message,
    });
  }
  sendPackage(res: Response, message: any, statusCode?: number) {
    return res.status(statusCode || 200).send({
      body: message,
    });
  }

  error(res: Response, message: string, statusCode?: number) {
    return res.status(statusCode || 500).send({
      error: message,
    });
  }
}
