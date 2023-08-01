import { InternalServerError, NotFoundError } from "../../../../errors";
import { Film } from "../../../../models/film";
import { Pagination } from "../../../../models/pagination";
import { Person } from "../../../../models/person";
import { Planet } from "../../../../models/planet";
import { Species } from "../../../../models/species";
import { Starship } from "../../../../models/starship";
import { Vehicle } from "../../../../models/vehicle";
import { buildQueryParams } from "../../../../utils/build-query-params";
import { isEmptyObject } from "../../../../utils/is-empty-object";
import { IStarWarsService, Options } from "../../interface";
import { filmMapper } from "./mappers/film-mapper";
import { createPaginationMapper } from "./mappers/pagination-mapper";
import { personMapper } from "./mappers/person-mapper";
import { planetMapper } from "./mappers/planet-mapper";
import { speciesMapper } from "./mappers/species-mapper";
import { starshipMapper } from "./mappers/starship-mapper";
import { vehicleMapper } from "./mappers/vehicle-mapper";
import { FilmDto } from "./responses/film-dto";
import { PaginationDto } from "./responses/pagination-dto";
import { PersonDto } from "./responses/person-dto";
import { PlanetDto } from "./responses/planet-dto";
import { SpeciesDto } from "./responses/species-dto";
import { StarshipDto } from "./responses/starship-dto";
import { VehicleDto } from "./responses/vehicle-dto";

export interface SwapiServiceSettings {
    baseUrl: string;
    loggingEnabled: boolean;
}

const filmsPageMapper = createPaginationMapper(filmMapper);
const peoplePageMapper = createPaginationMapper(personMapper);
const planetsPageMapper = createPaginationMapper(planetMapper);
const speciesPageMapper = createPaginationMapper(speciesMapper);
const starshipsPageMapper = createPaginationMapper(starshipMapper);
const vehiclesPageMapper = createPaginationMapper(vehicleMapper);

export class SwapiService implements IStarWarsService {
    constructor(
        private readonly settings: SwapiServiceSettings,
    ) { }

    private createOptions = (baseOptions?: Pick<Options, 'search' | 'page'>): Options => {
        const options: Options = {
            format: 'json',
        };

        if (typeof baseOptions?.search === 'string') {
            options.search = baseOptions.search;
        }

        if (typeof baseOptions?.page === 'number') {
            options.page = baseOptions.page;
        }

        return options;
    }

    private async get<T>(endpoint: string, queryParameters?: Partial<Options>): Promise<T> {
        // Create the url
        let url = `${this.settings.baseUrl}${endpoint}`;

        // Add the query parameters to the url if there are any
        if (queryParameters != null && !isEmptyObject(queryParameters)) {
            url += `?${buildQueryParams(queryParameters)}`;
        }

        // Log the url if logging is enabled
        if (this.settings.loggingEnabled) {
            console.log(`GET ${url}`);
        }

        // Fetch the data
        const response = await fetch(url);

        // Check if the response is ok
        if (!response.ok) {
            if (response.status === 404) throw new NotFoundError(url);
            throw new InternalServerError({
                description: "Error while fetching data from the Star Wars API.",
                url,
                status: response.status,
                statusText: response.statusText,
            });
        }

        // Return the data as json
        return await response.json();
    }

    public getFilmsPage = async (page: number, searchTerm?: string | undefined): Promise<Pagination<Film>> => {
        const options = this.createOptions({ search: searchTerm, page });
        const result = await this.get<PaginationDto<FilmDto>>('/films', options);
        return filmsPageMapper(page, result);
    };

    public getSingleFilm = async (id: number): Promise<Film> => {
        const options = this.createOptions();
        const result = await this.get<FilmDto>(`/films/${id}`, options);
        return filmMapper(result);
    };

    public getPeoplePage = async (page: number, searchTerm?: string | undefined): Promise<Pagination<Person>> => {
        const options = this.createOptions({ search: searchTerm, page });
        const result = await this.get<PaginationDto<PersonDto>>(`/people`, options);
        return peoplePageMapper(page, result);
    };

    public getSinglePerson = async (id: number): Promise<Person> => {
        const options = this.createOptions();
        const result = await this.get<PersonDto>(`/people/${id}`, options);
        return personMapper(result);
    };

    public getPlanetsPage = async (page: number, searchTerm?: string | undefined): Promise<Pagination<Planet>> => {
        const options = this.createOptions({ search: searchTerm, page });
        const result = await this.get<PaginationDto<PlanetDto>>(`/planets`, options);
        return planetsPageMapper(page, result);
    };

    public getSinglePlanet = async (id: number): Promise<Planet> => {
        const options = this.createOptions();
        const result = await this.get<PlanetDto>(`/planets/${id}`, options);
        return planetMapper(result);
    };

    public getSpeciesPage = async (page: number, searchTerm?: string | undefined): Promise<Pagination<Species>> => {
        const options = this.createOptions({ search: searchTerm, page });
        const result = await this.get<PaginationDto<SpeciesDto>>(`/species`, options);
        return speciesPageMapper(page, result);
    };

    public getSingleSpecies = async (id: number): Promise<Species> => {
        const options = this.createOptions();
        const result = await this.get<SpeciesDto>(`/species/${id}`, options);
        return speciesMapper(result);
    }

    public getStarshipsPage = async (page: number, searchTerm?: string | undefined): Promise<Pagination<Starship>> => {
        const options = this.createOptions({ search: searchTerm, page });
        const result = await this.get<PaginationDto<StarshipDto>>(`/starships`, options);
        return starshipsPageMapper(page, result);
    };

    public getSingleStarship = async (id: number): Promise<Starship> => {
        const options = this.createOptions();
        const result = await this.get<StarshipDto>(`/starships/${id}`, options);
        return starshipMapper(result);
    }

    public getVehiclesPage = async (page: number, searchTerm?: string | undefined): Promise<Pagination<Vehicle>> => {
        const options = this.createOptions({ search: searchTerm, page });
        const result = await this.get<PaginationDto<VehicleDto>>(`/vehicles`, options);
        return vehiclesPageMapper(page, result);
    }

    public getSingleVehicle = async (id: number): Promise<Vehicle> => {
        const options = this.createOptions();
        const result = await this.get<VehicleDto>(`/vehicles/${id}`, options);
        return vehicleMapper(result);
    } 
}