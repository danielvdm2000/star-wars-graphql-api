import { Person, PersonSchema } from "../../../../../models/person";
import { extractIdFromUrl } from "../../../../../utils/extract-id-from-url";
import { PersonDto } from "../responses/person-dto";

export function personMapper(personDto: PersonDto): Person {
    const person: Person = {
        name: personDto.name,
        height: personDto.height,
        mass: personDto.mass,
        hairColor: personDto.hair_color,
        skinColor: personDto.skin_color,
        eyeColor: personDto.eye_color,
        birthYear: personDto.birth_year,
        gender: personDto.gender,
        homeworldId: extractIdFromUrl(personDto.homeworld),
        filmIds: personDto.films.map(extractIdFromUrl),
        speciesIds: personDto.species.map(extractIdFromUrl),
        vehicleIds: personDto.vehicles.map(extractIdFromUrl),
        starshipIds: personDto.starships.map(extractIdFromUrl),
        createdAt: new Date(personDto.created),
        editedAt: new Date(personDto.edited),
    }

    return PersonSchema.parse(person);
}