import { Person } from "../../../models/person";
import { isNotError } from "../../../utils/is-not-error";
import { DateType, createPaginationType } from "../_shared/types";
import { FilmType } from "../films/types";
import { PlanetType } from "../planets/types";
import { graphBuilder } from "../create-schema";
import { SpeciesType } from "../species/types";
import { StarshipType } from "../starships/types";
import { VehicleType } from "../vehicles/types";

export const PersonType = graphBuilder.objectRef<Person>('Person');

PersonType.implement({
    fields: t => ({
        name: t.exposeString('name', {
            description: 'The name of this person.',
        }),
        height: t.exposeString('height', {
            description: 'The height of the person in centimeters.'
        }),
        mass: t.exposeString('mass', {
            description: 'The mass of the person in kilograms.'
        }),
        hairColor: t.exposeString('hairColor', {
            description: 'The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.',
        }),
        skinColor: t.exposeString('skinColor', {
            description: 'The skin color of this person.',
        }),
        eyeColor: t.exposeString('eyeColor', {
            description: 'The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.',
        }),
        birthYear: t.exposeString('birthYear', {
            description: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.',
        }),
        gender: t.exposeString('gender', {
            description: 'The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.',
        }),
        homeworld: t.field({
            description: 'The planet that this person was born on or inhabits.',
            errors: {},
            type: PlanetType,
            resolve: (src, _, ctx) => ctx.planetLoader.load(src.homeworldId),
        }),
        films: t.field({
            description: 'A list of film that this person has been in.',
            errors: {},
            type: [FilmType],
            resolve: async (src, _, ctx) => {
                const films = await ctx.filmLoader.loadMany(src.filmIds);
                return films.filter(isNotError);
            },
        }),
        species: t.field({
            description: 'A list of species that this person belongs to.',
            errors: {},
            type: [SpeciesType],
            resolve: async (src, _, ctx) => {
                const species = await ctx.speciesLoader.loadMany(src.speciesIds);
                return species.filter(isNotError);
            },
        }),
        vehicles: t.field({
            description: 'A list of vehicles that this person has piloted.',
            errors: {},
            type: [VehicleType],
            resolve: async (src, _, ctx) => {
                const vehicles = await ctx.vehicleLoader.loadMany(src.vehicleIds);
                return vehicles.filter(isNotError);
            },
        }),
        starships: t.field({
            description: 'A list of starships that this person has piloted.',
            errors: {},
            type: [StarshipType],
            resolve: async (src, _, ctx) => {
                const starships = await ctx.starshipLoader.loadMany(src.starshipIds);
                return starships.filter(isNotError);
            },
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

export const PeoplePageType = createPaginationType('PeoplePage', PersonType);
