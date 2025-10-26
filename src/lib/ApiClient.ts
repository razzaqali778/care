export type ApiOperation = string;

export interface ApiRequestContext {
  operation: ApiOperation;
  payload?: unknown;
}

export interface ApiResponseContext<T = unknown> extends ApiRequestContext {
  data: T;
}

export interface ApiInterceptor {
  onRequest?(context: ApiRequestContext): Promise<void> | void;
  onResponse?<T>(context: ApiResponseContext<T>): Promise<void> | void;
  onError?(error: unknown, context: ApiRequestContext): Promise<void> | void;
}

export class ApiClient {
  private readonly interceptors: ApiInterceptor[] = [];

  constructor(initialInterceptors: ApiInterceptor[] = []) {
    initialInterceptors.forEach((interceptor) => this.use(interceptor));
  }

  use(interceptor: ApiInterceptor) {
    this.interceptors.push(interceptor);
  }

  async execute<T>(
    operation: ApiOperation,
    action: () => Promise<T>,
    payload?: unknown
  ): Promise<T> {
    const context: ApiRequestContext = { operation, payload };

    for (const interceptor of this.interceptors) {
      await interceptor.onRequest?.(context);
    }

    try {
      const data = await action();
      for (const interceptor of this.interceptors) {
        await interceptor.onResponse?.({ ...context, data });
      }
      return data;
    } catch (error) {
      for (const interceptor of this.interceptors) {
        await interceptor.onError?.(error, context);
      }
      throw error;
    }
  }
}

export const createApiClient = (interceptors: ApiInterceptor[] = []) =>
  new ApiClient(interceptors);
