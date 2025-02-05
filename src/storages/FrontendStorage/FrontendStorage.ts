import { BaseStorage } from "../BaseStorage";

export class FrontendStorage extends BaseStorage {
  public async set<T>(key: string, value: T): Promise<void> {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public async clear(): Promise<void> {
    sessionStorage.clear();
  }

  public async dump(): Promise<Record<string, unknown>> {
    const result: Record<string, unknown> = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        const value = sessionStorage.getItem(key);
        result[key] = value ? JSON.parse(value) : null;
      }
    }
    return result;
  }
}
