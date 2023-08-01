import { graphBuilder } from "../create-schema";
import { VehicleType, VehiclesPageType } from "./types";

graphBuilder.queryField('vehicles', t => t.field({
    description: 'A list of all the vehicles in the Star Wars universe. Paginated by 10.',
    errors: {},
    type: VehiclesPageType,
    args: {
        page: t.arg.int(),
        search: t.arg.string({ description: 'Search for vehicles by name and model' }),
    },
    resolve: async (_, args, ctx) => ctx.starWarsService.getVehiclesPage(args.page ?? 1, args.search ?? undefined),
}));

graphBuilder.queryField('vehicle', t => t.field({
    description: 'A single vehicle from the Star Wars universe.',
    errors: {},
    type: VehicleType,
    args: {
        id: t.arg.int({ required: true }),
    },
    resolve: (_, args, ctx) => ctx.starWarsService.getSingleVehicle(args.id),
}));