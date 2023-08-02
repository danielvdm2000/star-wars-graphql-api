import { graphBuilder } from "../create-schema";
import { PeoplePageType, PersonType } from "./types";

graphBuilder.queryField('people', t => t.field({
    description: 'A list of all the people in the Star Wars universe. Paginated by 10.',
    errors: {},
    type: PeoplePageType,
    args: {
        page: t.arg.int(),
        search: t.arg.string({ description: 'Search for people by name.' }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getPeoplePage(args.page ?? 1, args.search ?? undefined),
}));

graphBuilder.queryField('person', t => t.field({
    description: 'A single person from the Star Wars universe.',
    errors: {},
    type: PersonType,
    args: {
        id: t.arg.int({ required: true }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getSinglePerson(args.id),
}));