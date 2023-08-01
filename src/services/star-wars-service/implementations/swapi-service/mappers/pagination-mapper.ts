import { z } from "zod";
import { Pagination, PaginationSchema } from "../../../../../models/pagination";
import { PaginationDto } from "../responses/pagination-dto";

export function createPaginationMapper<TDto, TResult>(resultMapper: (dto: TDto) => TResult) {
    return (page: number, paginationDto: PaginationDto<TDto>): Pagination<TResult> => {
        const pagination: Pagination<TResult> = {
            count: paginationDto.count,
            page,
            next: paginationDto.next,
            previous: paginationDto.previous,
            results: paginationDto.results.map(resultMapper),
        };
    
        return PaginationSchema(z.any()).parse(pagination);
    };
}