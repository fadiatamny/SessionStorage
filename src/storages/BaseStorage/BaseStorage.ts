export abstract class BaseStorage {
  public abstract set<T>(key: string, value: T): Promise<void>;
  public abstract get<T>(key: string): Promise<T | null>;
  public abstract clear(): Promise<void>;
  public abstract dump(): Promise<Record<string, unknown>>;
  public runWith<Response>(
    callback: () => Response,
    initialState: Record<string, any> | Map<string, any> = {},
  ): Response {
    return callback();
  }
  public run<Response>(callback: () => Response): Response {
    return callback();
  }
}
