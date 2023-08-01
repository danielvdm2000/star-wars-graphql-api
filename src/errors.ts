export abstract class BaseError extends Error {
    public abstract name: string;
    public abstract message: string;

    static throwIfError<T extends unknown>(value: T | Error): T {
        if (value instanceof Error) throw value;
        return value;
    }
}

export class InternalServerError extends BaseError {
    public name = "InternalServerError";
    public message = "An unexpected error occurred."
    public internalError: unknown;

    constructor(internalError: unknown) {
        super();
        this.internalError = internalError;
    }
}

export class NotFoundError extends BaseError {
    public name = "NotFoundError";
    public message = "Not found";
    private url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }
}