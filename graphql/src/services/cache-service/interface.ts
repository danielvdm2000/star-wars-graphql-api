export interface ICacheService {
    getOrAdd<T>(key: string, factory: () => Promise<T>, lifetime?: number): Promise<T>;
}