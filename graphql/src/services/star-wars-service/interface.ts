import { Film } from "../../models/film";
import { Pagination } from "../../models/pagination";
import { Person } from "../../models/person";
import { Planet } from "../../models/planet";
import { Species } from "../../models/species";
import { Starship } from "../../models/starship";
import { Vehicle } from "../../models/vehicle";

export interface IStarWarsService {
    // Films
    getFilmsPage(page: number, searchTerm?: string): Promise<Pagination<Film>>;
    getSingleFilm(id: number): Promise<Film>;

    // People
    getPeoplePage(page: number, searchTerm?: string): Promise<Pagination<Person>>;
    getSinglePerson(id: number): Promise<Person>;

    // Planets
    getPlanetsPage(page: number, searchTerm?: string): Promise<Pagination<Planet>>;
    getSinglePlanet(id: number): Promise<Planet>;

    // Species
    getSpeciesPage(page: number, searchTerm?: string): Promise<Pagination<Species>>;
    getSingleSpecies(id: number): Promise<Species>;

    // Starships
    getStarshipsPage(page: number, searchTerm?: string): Promise<Pagination<Starship>>;
    getSingleStarship(id: number): Promise<Starship>;

    // Vehicles
    getVehiclesPage(page: number, searchTerm?: string): Promise<Pagination<Vehicle>>;
    getSingleVehicle(id: number): Promise<Vehicle>;
}

export interface Options {
    search?: string;
    page?: number;
    format: string;
}