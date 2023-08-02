import { Species, SpeciesSchema } from "../../../../../models/species";
import { extractIdFromUrl } from "../../../../../utils/extract-id-from-url";
import { SpeciesDto } from "../responses/species-dto";

export function speciesMapper(specieDto: SpeciesDto): Species {
    const specie: Species = {
        name: specieDto.name,
        classification: specieDto.classification,
        designation: specieDto.designation,
        averageHeight: specieDto.average_height,
        skinColors: specieDto.skin_colors,
        hairColors: specieDto.hair_colors,
        eyeColors: specieDto.eye_colors,
        averageLifespan: specieDto.average_lifespan,
        homeworldId: specieDto.homeworld ? extractIdFromUrl(specieDto.homeworld) : null,
        language: specieDto.language,
        peopleIds: specieDto.people.map(extractIdFromUrl),
        filmIds: specieDto.films.map(extractIdFromUrl),
        createdAt: new Date(specieDto.created),
        editedAt: new Date(specieDto.edited),
    };

    return SpeciesSchema.parse(specie);
}