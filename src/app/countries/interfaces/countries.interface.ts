export interface CountriesResponse {
    content:          Country[];
    pageable:         Pageable;
    totalElements:    number;
    totalPages:       number;
    last:             boolean;
    sort:             Sort;
    first:            boolean;
    number:           number;
    numberOfElements: number;
    size:             number;
    empty:            boolean;
}

export interface Country {
    id:          number;
    name:        string;
    description: string;
    img:         null | string;
}

export interface Pageable {
    sort:       Sort;
    pageNumber: number;
    pageSize:   number;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    sorted:   boolean;
    unsorted: boolean;
    empty:    boolean;
}
