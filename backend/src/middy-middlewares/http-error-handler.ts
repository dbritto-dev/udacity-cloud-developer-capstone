import { HandlerLambda, NextFunction, Middleware } from "middy";
import { IValidatorOptions } from "middy/middlewares";

export const httpErrorHandler: Middleware<IValidatorOptions, any, any> = () => ({
  onError: (handler: HandlerLambda, next: NextFunction) => {
    // @ts-ignore
    if (handler.error.statusCode && handler.error.message) {
      handler.response = {
        // @ts-ignore
        statusCode: handler.error.statusCode,
        // @ts-ignore
        body: JSON.stringify({ message: handler.error.message, errors: handler.error.details }),
      };

      return next();
    }

    return next(handler.error);
  },
});
