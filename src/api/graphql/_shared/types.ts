import { ObjectRef } from "@pothos/core";
import { Pagination } from "../../../models/pagination";
import { graphBuilder } from "../create-schema";

graphBuilder.objectType(Error, {
    name: 'Error',
    fields: t => ({
        name: t.exposeString('name'),
        message: t.exposeString('message'),
    }),
});

export const DateType = graphBuilder.scalarType('Date', {
    serialize: value => value.toISOString(),
    parseValue: value => {
        const valueAsDate = new Date(value as any);

        if (value !== valueAsDate.toISOString())
            throw new Error('Date is not of ISO format');

        return valueAsDate;
    },
});

export function createPaginationType<T>(name: string, ResultType: ObjectRef<T>) {
    const PaginationType = graphBuilder.objectRef<Pagination<T>>(name);

    PaginationType.implement({
        fields: t => ({
            count: t.expose('count', { 
                type: 'Int' 
            }),
            page: t.expose('page', { 
                type: 'Int' 
            }),
            hasNext: t.boolean({
                resolve: src => src.next != null,
            }),
            hasPrevious: t.boolean({
                resolve: src => src.previous != null,
            }),
            results: t.expose('results', {
                type: [ResultType],
            }),
        })
    });

    return PaginationType;
}