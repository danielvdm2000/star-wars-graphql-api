import { Vehicle, VehicleSchema } from "../../../../../models/vehicle";
import { extractIdFromUrl } from "../../../../../utils/extract-id-from-url";
import { VehicleDto } from "../responses/vehicle-dto";

export function vehicleMapper(vehicleDto: VehicleDto): Vehicle {
    const vehicle: Vehicle = {
        name: vehicleDto.name,
        model: vehicleDto.model,
        manufacturer: vehicleDto.manufacturer,
        costInCredits: vehicleDto.cost_in_credits,
        length: vehicleDto.length,
        maxAtmospheringSpeed: vehicleDto.max_atmosphering_speed,
        crew: vehicleDto.crew,
        passengers: vehicleDto.passengers,
        cargoCapacity: vehicleDto.cargo_capacity,
        consumables: vehicleDto.consumables,
        vehicleClass: vehicleDto.vehicle_class,
        pilotIds: vehicleDto.pilots.map(extractIdFromUrl),
        filmIds: vehicleDto.films.map(extractIdFromUrl),
        createdAt: new Date(vehicleDto.created),
        editedAt: new Date(vehicleDto.edited),
    };

    return VehicleSchema.parse(vehicle);
}
