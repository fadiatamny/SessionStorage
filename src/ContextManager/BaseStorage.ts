export abstract class BaseStorage {
  abstract set<T>(key: string, value: T): Promise<void>;
  abstract get<T>(key: string): Promise<T | null>;
  abstract clear(): Promise<void>;
  abstract all(): Promise<Record<string, unknown>>;
}
