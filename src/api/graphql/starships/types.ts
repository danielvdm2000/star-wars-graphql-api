import { Starship } from "../../../models/starship";
import { isNotError } from "../../../utils/is-not-error";
import { DateType, createPaginationType } from "../_shared/types";
import { FilmType } from "../films/types";
import { PersonType } from "../people/types";
import { graphBuilder } from "../create-schema";

export const StarshipType = graphBuilder.objectRef<Starship>('Starship');

StarshipType.implement({
    fields: t => ({
        name: t.exposeString('name', {
            description: 'The name of this starship. The common name, such as "Death Star".'
        }),
        model: t.exposeString('model', {
            description: 'The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".'
        }),
        starshipClass: t.exposeString('starshipClass', {
            description: 'The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"'
        }),
        manufacturer: t.exposeString('manufacturer', {
            description: 'The manufacturer of this starship. Comma separated if more than one.'
        }),
        costInCredits: t.exposeString('costInCredits', {
            description: 'The cost of this starship new, in galactic credits.'
        }),
        length: t.exposeString('length', {
            description: 'The length of this starship in meters.'
        }),
        crew: t.exposeString('crew', {
            description: 'The number of personnel needed to run or pilot this starship.'
        }),
        passengers: t.exposeString('passengers', {
            description: 'The number of non-essential people this starship can transport.'
        }),
        maxAtmospheringSpeed: t.exposeString('maxAtmospheringSpeed', {
            description: 'The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.'
        }),
        hyperdriveRating: t.exposeString('hyperdriveRating', {
            description: 'The class of this starships hyperdrive.'
        }),
        mglt: t.exposeString('MGLT', {
            description: 'The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.'
        }),
        cargoCapacity: t.exposeString('cargoCapacity', {
            description: 'The maximum number of kilograms that this starship can transport.'
        }),
        consumables: t.exposeString('consumables', {
            description: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.'
        }),
        pilots: t.field({
            description: 'A list of People that this starship has been piloted by.',
            errors: {},
            type: [PersonType],
            resolve: async (src, _, ctx) => {
                const pilots = await ctx.personLoader.loadMany(src.pilotIds);
                return pilots.filter(isNotError);
            }
        }),
        films: t.field({
            description: 'A list of Films that this starship has appeared in.',
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
})

export const StarshipsPageType = createPaginationType('StarshipsPage', StarshipType);