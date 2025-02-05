import { BaseStorage } from "../BaseStorage";
import { AsyncLocalStorageClass, AsyncLocalStorageInstance } from "./types";

let AsyncLocalStorage: AsyncLocalStorageClass<Map<string, any>>;
if (typeof window === "undefined") {
  const { AsyncLocalStorage: NodeAsyncStorage } = require("async_hooks");
  AsyncLocalStorage = NodeAsyncStorage;
}

export class BackendStorage extends BaseStorage {
  private storage: AsyncLocalStorageInstance<Map<string, any>>;

  constructor() {
    super();
    this.storage = new AsyncLocalStorage();
  }

  public async set<T = any>(key: string, value: T): Promise<void> {
    let store = this.storage.getStore();
    if (!store) {
      store = new Map<string, any>();
      this.storage.enterWith(store);
    }
    store.set(key, value);
  }

  public async get<T = any>(key: string): Promise<T | null> {
    const store = this.storage.getStore();
    return store?.get(key) ?? null;
  }

  public async clear(): Promise<void> {
    this.storage.enterWith(new Map<string, any>());
  }

  public async dump(): Promise<Record<string, any>> {
    const store = this.storage.getStore();
    const result: Record<string, any> = {};
    store?.forEach((value: any, key: string) => {
      result[key] = value;
    });
    return result;
  }

  public runWith<Response>(
    callback: () => Response,
    initialState: Record<string, any> | Map<string, any> = {},
  ): Response {
    const store = new Map<string, any>(
      initialState instanceof Map ? initialState : Object.entries(initialState),
    );
    return this.storage.run(store, callback);
  }

  public run<Response>(callback: () => Response): Response {
    const store = new Map<string, any>();
    return this.storage.run(store, callback);
  }
}
