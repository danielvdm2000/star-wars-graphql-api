import { Film } from "../../../models/film";
import { isNotError } from "../../../utils/is-not-error";
import { DateType, createPaginationType } from "../_shared/types";
import { PersonType } from "../people/types";
import { PlanetType } from "../planets/types";
import { graphBuilder } from "../create-schema";
import { SpeciesType } from "../species/types";
import { StarshipType } from "../starships/types";
import { VehicleType } from "../vehicles/types";

export const FilmType = graphBuilder.objectRef<Film>('Film');

FilmType.implement({
    fields: t => ({
        title: t.exposeString('title', {
            description: 'The title of this film.',
        }),
        episodeId: t.exposeInt('episodeId', {
            description: 'The episode number of this film.',
        }),
        openingCrawl: t.exposeString('openingCrawl', {
            description: 'The opening paragraphs at the beginning of this film.',
        }),
        director: t.exposeString('director', {
            description: 'The name of the director of this film.',
        }),
        producer: t.exposeString('producer', {
            description: 'The name(s) of the producer(s) of this film. Comma separated.',
        }),
        releaseDate: t.expose('releaseDate', {
            description: 'The ISO 8601 date format of film release at original creator country.',
            type: DateType, 
        }),
        characters: t.field({
            description: 'A list of characters that appear in this film.',
            errors: {},
            type: [PersonType],
            resolve: async (src, _, ctx) => {
                const people = await ctx.personLoader.loadMany(src.characterIds);
                return people.filter(isNotError);
            },
        }),
        planets: t.field({
            description: 'A list of planets that are in this film.',
            errors: {},
            type: [PlanetType],
            resolve: async (src, _, ctx) => {
                const planets = await ctx.planetLoader.loadMany(src.planetIds);
                return planets.filter(isNotError);
            }
        }),
        starships: t.field({
            description: 'A list of starships that are in this film.',
            errors: {},
            type: [StarshipType],
            resolve: async (src, _, ctx) => {
                const starships = await ctx.starshipLoader.loadMany(src.starshipIds);
                return starships.filter(isNotError);
            }
        }),
        vehicles: t.field({
            description: 'A list of vehicles that are in this film.',
            errors: {},
            type: [VehicleType],
            resolve: async (src, _, ctx) => {
                const vehicles = await ctx.vehicleLoader.loadMany(src.vehicleIds);
                return vehicles.filter(isNotError);
            }
        }),
        species: t.field({
            description: 'A list of species that are in this film.',
            errors: {},
            type: [SpeciesType],
            resolve: async (src, _, ctx) => {
                const species = await ctx.speciesLoader.loadMany(src.speciesIds);
                return species.filter(isNotError);
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
    }),
});

export const FilmsPageType = createPaginationType('FilmsPage', FilmType);