import { ICacheService } from "../../../cache-service/interface";
import { IStarWarsService } from "../../interface";

const ONE_DAY = 1000 * 60 * 60 * 24;

type AsyncFunc = (...args: any[]) => Promise<any>;

export class CachedStarWarsService implements IStarWarsService {
    constructor(
        private readonly swapiService: IStarWarsService, 
        private readonly cacheService: ICacheService
    ) {}

    private withCache = <TFunc extends AsyncFunc>(cacheKey: string, func: TFunc) => {
        return (...args: Parameters<TFunc>) => this.cacheService.getOrAdd(
            `${cacheKey}_${JSON.stringify(args)}`,
            () => func(...args),
            ONE_DAY,
        );
    }

    public getFilmsPage = this.withCache('getFilmsPage', this.swapiService.getFilmsPage);
    public getSingleFilm = this.withCache('getSingleFilm', this.swapiService.getSingleFilm);
    public getPeoplePage = this.withCache('getPeoplePage', this.swapiService.getPeoplePage);
    public getSinglePerson = this.withCache('getSinglePerson', this.swapiService.getSinglePerson);
    public getPlanetsPage = this.withCache('getPlanetsPage', this.swapiService.getPlanetsPage);
    public getSinglePlanet = this.withCache('getSinglePlanet', this.swapiService.getSinglePlanet);
    public getSpeciesPage = this.withCache('getSpeciesPage', this.swapiService.getSpeciesPage);
    public getSingleSpecies = this.withCache('getSingleSpecies', this.swapiService.getSingleSpecies);
    public getStarshipsPage = this.withCache('getStarshipsPage', this.swapiService.getStarshipsPage);
    public getSingleStarship = this.withCache('getSingleStarship', this.swapiService.getSingleStarship);
    public getVehiclesPage = this.withCache('getVehiclesPage', this.swapiService.getVehiclesPage);
    public getSingleVehicle = this.withCache('getSingleVehicle', this.swapiService.getSingleVehicle);
}