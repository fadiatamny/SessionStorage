export type AsyncLocalStorageClass<T> = new () => AsyncLocalStorageInstance<T>;

export interface AsyncLocalStorageInstance<T> {
  getStore(): T | undefined;
  enterWith(store: T): void;
  run<R>(store: T, callback: (...args: any[]) => R, ...args: any[]): R;
}
