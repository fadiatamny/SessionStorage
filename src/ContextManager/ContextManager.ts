import { BackendStorage } from "./BackendStorage";
import type { BaseStorage } from "./BaseStorage";
import { FrontendStorage } from "./FrontendStorage";

export class ContextManager {
  private static _instance: BaseStorage | null = null;
  public static get instance() {
    if (!this._instance) {
      this._instance = this.generateInstance();
    }

    return this._instance;
  }

  private static generateInstance() {
    if (
      typeof window !== "undefined" &&
      typeof sessionStorage !== "undefined"
    ) {
      return new FrontendStorage();
    }

    return new BackendStorage();
  }
}
