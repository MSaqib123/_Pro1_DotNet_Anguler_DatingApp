export interface Pagination {
    currentPage:Number;
    itemsPerPage:number;
    totalItems: number;
    totalPages:number;
}

export class PaginatedResult<T>{
    items?: T; //member[], product[]
    pagination?:Pagination
}