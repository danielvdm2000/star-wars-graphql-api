import { Planet, PlanetSchema } from "../../../../../models/planet";
import { extractIdFromUrl } from "../../../../../utils/extract-id-from-url";
import { PlanetDto } from "../responses/planet-dto";

export function planetMapper(planetDto: PlanetDto): Planet {
    const planet: Planet = {
        name: planetDto.name,
        rotationPeriod: planetDto.rotation_period,
        orbitalPeriod: planetDto.orbital_period,
        diameter: planetDto.diameter,
        climate: planetDto.climate,
        gravity: planetDto.gravity,
        terrain: planetDto.terrain,
        surfaceWater: planetDto.surface_water,
        population: planetDto.population,
        residentIds: planetDto.residents.map(extractIdFromUrl),
        filmIds: planetDto.films.map(extractIdFromUrl),
        createdAt: new Date(planetDto.created),
        editedAt: new Date(planetDto.edited),
    };

    return PlanetSchema.parse(planet);
}