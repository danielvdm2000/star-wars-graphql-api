import { Vehicle } from "../../../models/vehicle";
import { isNotError } from "../../../utils/is-not-error";
import { DateType, createPaginationType } from "../_shared/types";
import { FilmType } from "../films/types";
import { PersonType } from "../people/types";
import { graphBuilder } from "../create-schema";

export const VehicleType = graphBuilder.objectRef<Vehicle>('Vehicle');

VehicleType.implement({
    fields: t => ({
        name: t.exposeString('name', {
            description: 'The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".',
        }),
        model: t.exposeString('model', {
            description: 'The model or official name of this vehicle. Such as "All-Terrain Attack Transport".',
        }),
        vehicleClass: t.exposeString('vehicleClass', {
            description: 'The class of this vehicle, such as "Wheeled" or "Repulsorcraft".',
        }),
        manufacturer: t.exposeString('manufacturer', {
            description: 'The manufacturer of this vehicle. Comma separated if more than one.',
        }),
        length: t.exposeString('length', {
            description: 'The length of this vehicle in meters.',
        }),
        costInCredits: t.exposeString('costInCredits', {
            description: 'The cost of this vehicle new, in galactic credits.',
        }),
        crew: t.exposeString('crew', {
            description: 'The number of personnel needed to run or pilot this vehicle.',
        }),
        passengers: t.exposeString('passengers', {
            description: 'The number of non-essential people this vehicle can transport.',
        }),
        maxAtmospheringSpeed: t.exposeString('maxAtmospheringSpeed', {
            description: 'The maximum speed of this vehicle in the atmosphere.',
        }),
        cargoCapacity: t.exposeString('cargoCapacity', {
            description: 'The maximum number of kilograms that this vehicle can transport.',
        }),
        consumables: t.exposeString('consumables', {
            description: 'The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.',
        }),
        pilots: t.field({
            description: 'A list of People that this vehicle has been piloted by.',
            errors: {},
            type: [PersonType],
            resolve: async (src, _, ctx) => {
                const pilots = await ctx.personLoader.loadMany(src.pilotIds);
                return pilots.filter(isNotError);
            }
        }),
        films: t.field({
            description: 'A list of Films that this vehicle has appeared in.',
            errors: {},
            type: [FilmType],
            resolve: async (src, _, ctx) => {
                const films = await ctx.filmLoader.loadMany(src.filmIds);
                return films.filter(isNotError);
            }
        }),
        createdAt: t.expose('createdAt', { 
            description: 'The ISO 8601 date format of the time that this resource was created.',
            type: DateType, 
        }),
        editedAt: t.expose('editedAt', {
            description: 'The ISO 8601 date format of the time that this resource was edited.',
            type: DateType, 
        }),
    })
});

export const VehiclesPageType = createPaginationType('VehiclesPage', VehicleType);