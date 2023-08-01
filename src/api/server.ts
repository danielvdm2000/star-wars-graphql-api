import { Server, createServer } from 'node:http';
import { createYoga } from "graphql-yoga";
import { useGraphQlJit } from "@envelop/graphql-jit";
import { createSchema } from './graphql/create-schema';
import { createRequestContext } from './create-request-context';
import { BaseError } from '../errors';

export interface ServerSettings {
    port: number;
    mode: 'development' | 'production';
}

export function startServer(settings: ServerSettings): Server {
    // Create the GraphQL schema
    const schema = createSchema();

    // Create yoga server
    const yoga = createYoga({
        schema,
        landingPage: false,
        graphiql: settings.mode === 'development',
        plugins: [useGraphQlJit()],
    })

    const server = createServer(async (req, res) => {
        try {
            // Want to add some REST endpoints? Do it here!

            // Handle GraphQL requests
            return yoga(req, res, createRequestContext(req));
        } catch (error: unknown) {
            // Log any errors
            console.error(error);

            // Check if this is a known error
            if (error instanceof Error && error.constructor.prototype instanceof BaseError) {
                // Return a Bad Request
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: error.message }));
            }

            // Return an Internal Server Error
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    });


    server.listen(settings.port, async () => {
        console.info(`Server is running on http://localhost:${settings.port}/graphql`);
    });   

    return server;
}

export async function gracefulShutdown(server: Server) {
    // Shutdown the server
    console.info('Shutting down server...');
    await new Promise(resolve => server.close(err => {
        if (err) console.error(err);
        resolve(null);
    }));

    // Exit the process
    console.info('Exiting process...');
    process.exit();
}