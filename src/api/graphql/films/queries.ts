import { graphBuilder } from "../create-schema";
import { FilmType, FilmsPageType } from "./types";

graphBuilder.queryField('films', t => t.field({
    description: 'A list of all the films in the Star Wars universe. Paginated by 10.',
    errors: {},
    type: FilmsPageType,
    args: {
        page: t.arg.int(),
        search: t.arg.string({ description: 'Search for films by title.'}),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getFilmsPage(args.page ?? 1, args.search ?? undefined),
}));

graphBuilder.queryField('film', t => t.field({
    description: 'A single film from the Star Wars universe.',
    errors: {},
    type: FilmType,
    args: {
        id: t.arg.int({ required: true }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getSingleFilm(args.id),
}));