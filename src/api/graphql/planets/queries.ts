import { graphBuilder } from "../create-schema";
import { PlanetType, PlanetsPageType } from "./types";

graphBuilder.queryField('planets', t => t.field({
    description: 'A list of all the planets in the Star Wars universe. Paginated by 10.',
    errors: {},
    type: PlanetsPageType,
    args: {
        page: t.arg.int(),
        search: t.arg.string({ description: 'Search for planets by name.' }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getPlanetsPage(args.page ?? 1, args.search ?? undefined),
}));

graphBuilder.queryField('planet', t => t.field({
    description: 'A single planet from the Star Wars universe.',
    errors: {},
    type: PlanetType,
    args: {
        id: t.arg.int({ required: true }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getSinglePlanet(args.id),
}));