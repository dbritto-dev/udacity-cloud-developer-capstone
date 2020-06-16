import middy from "@middy/core";

export const httpErrorHandler: middy.Middleware<any, any, any> = () => ({
  onError: (handler: middy.HandlerLambda, next: middy.NextFunction) => {
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
