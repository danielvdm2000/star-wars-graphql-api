import { IMiddleware } from 'graphql-middleware';
import { BaseError, InternalServerError } from '../../errors';
import { RequestContext } from '../request-context';


// Add any args that you don't want to log here
const ARGS_NOT_TO_LOG: string[] = [
    
]

function stringifyArgs(args: unknown) {
    return JSON.stringify(args, (key, value) => ARGS_NOT_TO_LOG.includes(key) ? 'REMOVED' : value, 2);
}

export const errorLoggerMiddleware: IMiddleware<any, RequestContext, any> = async (resolve, src, args, context, info) => {
    let result = await resolve(src, args, context, info);

    const isError =
        result instanceof Error ||
        result?.constructor == Error ||
        result?.constructor?.prototype instanceof Error;

    if (isError) {
        console.log(`--------------- ${result.name} ---------------`);
        console.log(`time: ${new Date().toISOString()}`);
        console.log(`args: ${stringifyArgs(args)}`)
        console.log(`src: ${JSON.stringify(src)}`)
        console.error(result);
        console.log();
    }

    const isCustomError = result?.constructor?.prototype instanceof BaseError;

    if (isError && !isCustomError) {
        const internalServerError = new InternalServerError(result);
        result.name = internalServerError.name;
        result.message = internalServerError.message;
    }

    return result;
}