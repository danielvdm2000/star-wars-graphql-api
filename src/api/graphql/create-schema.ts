import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import { RequestContext } from '../request-context';
import { applyMiddleware } from 'graphql-middleware';
import { errorLoggerMiddleware } from './middleware';

interface SchemaOptions extends Partial<PothosSchemaTypes.UserSchemaTypes> {
    Context: RequestContext,
    Scalars: {
        Date: {
            Input: Date;
            Output: Date;
        };
    };
}

export const graphBuilder = new SchemaBuilder<SchemaOptions>({
    plugins: [
        ErrorsPlugin,
    ],
    errorOptions: {
        defaultTypes: [Error],
    },
});

graphBuilder.queryType({});

import './_shared/types';

import './films/queries';
import './films/types';

import './people/queries';
import './people/types';

import './planets/queries';
import './planets/types';

import './species/queries';
import './species/types';

import './starships/queries';
import './starships/types';

import './vehicles/queries';
import './vehicles/types';

export const createSchema = () => applyMiddleware(
    graphBuilder.toSchema(),
    errorLoggerMiddleware,
);
