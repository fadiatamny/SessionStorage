import { BaseStorage } from "../BaseStorage";
import { AsyncLocalStorageClass, AsyncLocalStorageInstance } from "./types";

let AsyncLocalStorage: AsyncLocalStorageClass<Map<string, any>>;
if (typeof window === "undefined") {
  import("async_hooks")
    .then(({ AsyncLocalStorage: NodeAsyncLocalStorage }) => {
      AsyncLocalStorage = NodeAsyncLocalStorage;
    })
    .catch((error) => {
      console.error("Failed to load async_hooks module", error);
    });
}

export class BackendStorage extends BaseStorage {
  private storage: AsyncLocalStorageInstance<Map<string, any>>;

  constructor() {
    super();
    this.storage = new AsyncLocalStorage();
  }

  async set<T = any>(key: string, value: T): Promise<void> {
    let store = this.storage.getStore();
    if (!store) {
      store = new Map<string, any>();
      this.storage.enterWith(store);
    }
    store.set(key, value);
  }

  async get<T = any>(key: string): Promise<T | null> {
    const store = this.storage.getStore();
    return store?.get(key) ?? null;
  }

  async clear(): Promise<void> {
    this.storage.enterWith(new Map<string, any>());
  }

  async all(): Promise<Record<string, any>> {
    const store = this.storage.getStore();
    const result: Record<string, any> = {};
    store?.forEach((value: any, key: string) => {
      result[key] = value;
    });
    return result;
  }
}
