


export class Pagination {

    constructor(public currentPage: number = 1,
        public itemsPerPage: number = 10,
        public totalPages: number,
        public datasource:any[]){

        }
}