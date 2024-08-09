export interface Page<T> {
    totalPages:       number;
    totalElements:    number;
    pageable:         Pageable;
    size:             number;
    content:          T[];
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    last:             boolean;
    empty:            boolean;
}

interface Pageable {
    pageNumber: number;
    pageSize:   number;
    paged:      boolean;
    unpaged:    boolean;
    offset:     number;
    sort:       Sort;
}

interface Sort {
    sorted:   boolean;
    unsorted: boolean;
    empty:    boolean;
}