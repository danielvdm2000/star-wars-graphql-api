import DataLoader from "dataloader";
import { IStarWarsService } from "../services/star-wars-service/interface";
import { Person } from "../models/person";
import { Planet } from "../models/planet";
import { Film } from "../models/film";
import { Species } from "../models/species";
import { Starship } from "../models/starship";
import { Vehicle } from "../models/vehicle";

export interface RequestContext {
    // Service
    starWarsService: IStarWarsService;

    // Dataloaders
    filmLoader: DataLoader<number, Film>;
    personLoader: DataLoader<number, Person>;
    planetLoader: DataLoader<number, Planet>;
    speciesLoader: DataLoader<number, Species>;
    starshipLoader: DataLoader<number, Starship>;
    vehicleLoader: DataLoader<number, Vehicle>;
}