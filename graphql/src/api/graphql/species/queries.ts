import { graphBuilder } from "../create-schema";
import { SpeciesPageType, SpeciesType } from "./types";

graphBuilder.queryField('species', t => t.field({
    description: 'A list of all the species in the Star Wars universe. Paginated by 10.',
    errors: {},
    type: SpeciesPageType,
    args: {
        page: t.arg.int(),
        search: t.arg.string({ description: 'Search for species by name.' }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getSpeciesPage(args.page ?? 1, args.search ?? undefined),
}));

graphBuilder.queryField('singleSpecies', t => t.field({
    description: 'A single species from the Star Wars universe.',
    errors: {},
    type: SpeciesType,
    args: {
        id: t.arg.int({ required: true }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getSingleSpecies(args.id),
}));