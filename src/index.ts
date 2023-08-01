import { gracefulShutdown, startServer } from "./api/server";
import { serverSettings } from "./settings";

const server = startServer(serverSettings);
const shutdown = () => gracefulShutdown(server);

// Handle different events that will force the server to shutdown
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    shutdown();
});

process.on('uncaughtException', (exception) => {
    console.error('Uncaught Exception: ', exception);
    shutdown();
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    shutdown();
});