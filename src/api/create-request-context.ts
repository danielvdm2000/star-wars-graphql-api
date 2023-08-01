import { IncomingMessage } from "node:http";
import { RequestContext } from "./request-context";
import { ICacheService } from "../services/cache-service/interface";
import { InMemoryCacheService } from "../services/cache-service/implementations/in-memory-cache-service";
import { SwapiService } from "../services/star-wars-service/implementations/swapi-service/implementation";
import { IStarWarsService } from "../services/star-wars-service/interface";
import { swapiServiceSettings } from "../settings";
import { CachedStarWarsService } from "../services/star-wars-service/implementations/cached-star-wars-service/implementation";
import { Person } from "../models/person";
import DataLoader from "dataloader";
import { Film } from "../models/film";
import { Planet } from "../models/planet";
import { Species } from "../models/species";
import { Starship } from "../models/starship";
import { Vehicle } from "../models/vehicle";

// Setup singleton service instances
const cacheService: ICacheService = new InMemoryCacheService();
const swapiService: IStarWarsService = new SwapiService(swapiServiceSettings);
const cachedStarWarsService: IStarWarsService = new CachedStarWarsService(swapiService, cacheService);

export function createRequestContext(request: IncomingMessage): RequestContext {
    
    // Setup data loaders
    const filmLoader = new DataLoader<number, Film>(ids => {
        return Promise.all(ids.map(id => cachedStarWarsService.getSingleFilm(id)));
    });
    const personLoader = new DataLoader<number, Person>(ids => {
        return Promise.all(ids.map(id => cachedStarWarsService.getSinglePerson(id)));
    });
    const planetLoader = new DataLoader<number, Planet>(ids => {
        return Promise.all(ids.map(id => cachedStarWarsService.getSinglePlanet(id)));
    });
    const speciesLoader = new DataLoader<number, Species>(ids => {
        return Promise.all(ids.map(id => cachedStarWarsService.getSingleSpecies(id)));
    });
    const starshipLoader = new DataLoader<number, Starship>(ids => {
        return Promise.all(ids.map(id => cachedStarWarsService.getSingleStarship(id)));
    });
    const vehicleLoader = new DataLoader<number, Vehicle>(ids => {
        return Promise.all(ids.map(id => cachedStarWarsService.getSingleVehicle(id)));
    });

    const requestContext: RequestContext = {
        // Services
        starWarsService: cachedStarWarsService,

        // Dataloaders
        filmLoader,
        personLoader,
        planetLoader,
        speciesLoader,
        starshipLoader,
        vehicleLoader,
    };

    return requestContext;
}