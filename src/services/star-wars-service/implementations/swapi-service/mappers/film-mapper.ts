import { Film, FilmSchema } from "../../../../../models/film";
import { extractIdFromUrl } from "../../../../../utils/extract-id-from-url";
import { FilmDto } from "../responses/film-dto";

export function filmMapper(filmDto: FilmDto): Film {
    const film: Film = {
        title: filmDto.title,
        episodeId: filmDto.episode_id,
        openingCrawl: filmDto.opening_crawl,
        director: filmDto.director,
        producer: filmDto.producer,
        releaseDate: new Date(filmDto.release_date),
        characterIds: filmDto.characters.map(extractIdFromUrl),
        planetIds: filmDto.planets.map(extractIdFromUrl),
        starshipIds: filmDto.starships.map(extractIdFromUrl),
        vehicleIds: filmDto.vehicles.map(extractIdFromUrl),
        speciesIds: filmDto.species.map(extractIdFromUrl),
        createdAt: new Date(filmDto.created),
        editedAt: new Date(filmDto.edited),
    };

    return FilmSchema.parse(film);
}