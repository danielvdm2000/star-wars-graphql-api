import { graphBuilder } from "../create-schema";
import { StarshipType, StarshipsPageType } from "./types";

graphBuilder.queryField('starships', t => t.field({
    description: 'A list of all the starships in the Star Wars universe. Paginated by 10.',
    errors: {},
    type: StarshipsPageType,
    args: {
        page: t.arg.int(),
        search: t.arg.string({ description: 'Search for starships by name and model' }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getStarshipsPage(args.page ?? 1, args.search ?? undefined),
}));

graphBuilder.queryField('starship', t => t.field({
    description: 'A single starship from the Star Wars universe.',
    errors: {},
    type: StarshipType,
    args: {
        id: t.arg.int({ required: true }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getSingleStarship(args.id),
}));