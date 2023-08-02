import { Species } from "../../../models/species";
import { isNotError } from "../../../utils/is-not-error";
import { DateType, createPaginationType } from "../_shared/types";
import { FilmType } from "../films/types";
import { PersonType } from "../people/types";
import { PlanetType } from "../planets/types";
import { graphBuilder } from "../create-schema";

export const SpeciesType = graphBuilder.objectRef<Species>('Species');

SpeciesType.implement({
    fields: t => ({
        name: t.exposeString('name', {
            description: 'The name of this species.',
        }),
        classification: t.exposeString('classification', {
            description: 'The classification of this species, such as "mammal" or "reptile".',
        }),
        designation: t.exposeString('designation', {
            description: 'The designation of this species, such as "sentient".',
        }),
        averageHeight: t.exposeString('averageHeight', {
            description: 'The average height of this species in centimeters.',
        }),
        skinColors: t.exposeString('skinColors', {
            description: 'A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.'
        }),
        hairColors: t.exposeString('hairColors', {
            description: 'A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.'
        }),
        eyeColors: t.exposeString('eyeColors', {
            description: 'A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.',
        }),
        averageLifespan: t.exposeString('averageLifespan', {
            description: 'The average lifespan of this species in years.',
        }),
        language: t.exposeString('language', {
            description: 'The language commonly spoken by this species.',
        }),
        homeworld: t.field({
            description: 'A planet that this species originates from.',
            errors: {},
            nullable: true,
            type: PlanetType,
            resolve: (src, _, ctx) => {
                if (src.homeworldId == null) return null;
                return ctx.planetLoader.load(src.homeworldId);
            },
        }),
        people: t.field({
            description: 'A list of People that are a part of this species.',
            errors: {},
            type: [PersonType],
            resolve: async (src, _, ctx) => {
                const people = await ctx.personLoader.loadMany(src.peopleIds);
                return people.filter(isNotError);
            }
        }),
        films: t.field({
            description: 'A list of Films that this species has appeared in.',
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

export const SpeciesPageType = createPaginationType('SpeciesPage', SpeciesType);
