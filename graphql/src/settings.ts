import dotenv from 'dotenv';
import { ParseStringToIntSchema } from './utils/parse-string-to-int-schema';
import { z } from 'zod';
import { ServerSettings } from './api/server';
import { SwapiServiceSettings } from './services/star-wars-service/implementations/swapi-service/implementation';
import { ParseStringToBooleanSchema } from './utils/parse-string-to-boolean-schema';

// Load .env file
dotenv.config();

// Define Zod Schema for .env file
const EnvironmentVariablesSchema = z.object({
    PORT: ParseStringToIntSchema,
    MODE: z.enum(['development', 'production']),
    SWAPI_API_BASE_URL: z.string(),
    ENABLE_GRAPHQL_EXPLORER: ParseStringToBooleanSchema,
});

// Parse and export environment variables
export const settings = Object.freeze({
    ...EnvironmentVariablesSchema.parse(process.env),
});

// Export settings for the server
export const serverSettings: ServerSettings = Object.freeze({
    port: settings.PORT,
    mode: settings.MODE,
    enableGraphqlExplorer: settings.ENABLE_GRAPHQL_EXPLORER,
});

// Export settings for the http swapi service
export const swapiServiceSettings: SwapiServiceSettings = Object.freeze({
    baseUrl: settings.SWAPI_API_BASE_URL,
    loggingEnabled: settings.MODE === 'development',
});