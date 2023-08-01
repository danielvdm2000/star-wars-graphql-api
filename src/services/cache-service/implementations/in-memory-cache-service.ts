import { ICacheService } from "../interface";

export class InMemoryCacheService implements ICacheService {
  private cache = new Map<string, Promise<any>>();

  async getOrAdd<T>(key: string, factory: () => Promise<T>, lifetime?: number): Promise<T> {
    // Get the value from the cache if it exists
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    // Otherwise, execute the factory function
    const resultPromise = factory();

    // Only store the promise if a lifetime was specified
    if (lifetime != null) {
      // Store the promise in the cache
      this.cache.set(key, resultPromise);

      // Remove the promise from the cache after the lifetime expires
      setTimeout(() => {
        this.cache.delete(key);
      }, lifetime);
    }

    return resultPromise;
  }
}