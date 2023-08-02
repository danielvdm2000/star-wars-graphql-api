import { Planet } from "../../../models/planet";
import { isNotError } from "../../../utils/is-not-error";
import { DateType, createPaginationType } from "../_shared/types";
import { FilmType } from "../films/types";
import { PersonType } from "../people/types";
import { graphBuilder } from "../create-schema";

export const PlanetType = graphBuilder.objectRef<Planet>('Planet');

PlanetType.implement({
    fields: t => ({
        name: t.exposeString('name', {
            description: 'The name of this planet.',
        }),
        rotationPeriod: t.exposeString('rotationPeriod', {
            description: 'The number of standard hours it takes for this planet to complete a single rotation on its axis.',
        }),
        orbitalPeriod: t.exposeString('orbitalPeriod', {
            description: 'The number of standard days it takes for this planet to complete a single orbit of its local star.',
        }),
        diameter: t.exposeString('diameter', {
            description: 'The diameter of this planet in kilometers.',
        }),
        climate: t.exposeString('climate', {
            description: 'The climate of this planet. Comma-seperated if diverse.',
        }),
        gravity: t.exposeString('gravity', {
            description: 'A number denoting the gravity of this planet. Where 1 is normal.',
        }),
        terrain: t.exposeString('terrain', {
            description: 'The terrain of this planet. Comma-seperated if diverse.',
        }),
        surfaceWater: t.exposeString('surfaceWater', {
            description: 'The percentage of the planet surface that is naturally occuring water or bodies of water.',
        }),
        population: t.exposeString('population', {
            description: 'The average population of sentient beings inhabiting this planet.',
        }),
        residents: t.field({
            description: 'A list of People that live on this planet.',
            errors: {},
            type: [PersonType],
            resolve: async (src, _, ctx) => {
                const residents = await ctx.personLoader.loadMany(src.residentIds);
                return residents.filter(isNotError);
            }
        }),
        films: t.field({
            description: 'A list of Films that this planet has appeared in.',
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

export const PlanetsPageType = createPaginationType('PlanetsPage', PlanetType);
