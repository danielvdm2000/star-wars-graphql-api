import { Starship, StarshipSchema } from "../../../../../models/starship";
import { extractIdFromUrl } from "../../../../../utils/extract-id-from-url";
import { StarshipDto } from "../responses/starship-dto";

export function starshipMapper(starshipDto: StarshipDto): Starship {
    const starship: Starship = {
        name: starshipDto.name,
        model: starshipDto.model,
        manufacturer: starshipDto.manufacturer,
        costInCredits: starshipDto.cost_in_credits,
        length: starshipDto.length,
        maxAtmospheringSpeed: starshipDto.max_atmosphering_speed,
        crew: starshipDto.crew,
        passengers: starshipDto.passengers,
        cargoCapacity: starshipDto.cargo_capacity,
        consumables: starshipDto.consumables,
        hyperdriveRating: starshipDto.hyperdrive_rating,
        MGLT: starshipDto.MGLT,
        starshipClass: starshipDto.starship_class,
        pilotIds: starshipDto.pilots.map(extractIdFromUrl),
        filmIds: starshipDto.films.map(extractIdFromUrl),
        createdAt: new Date(starshipDto.created),
        editedAt: new Date(starshipDto.edited),
    };

    return StarshipSchema.parse(starship);
}
