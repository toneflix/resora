export interface MetaData {
    [key: string]: any;
}

export interface ResourceData {
    [key: string]: any;
}

export interface Resource extends ResourceData {
    cursor?: Cursor | undefined;
    pagination?: Pagination | undefined;
}

export interface NonCollectible {
    data: ResourceData;
}

export interface Collectible {
    data: ResourceData[];
    cursor?: Cursor | undefined;
    pagination?: Pagination | undefined;
}

export interface ResponseData<R extends ResourceData = any> extends Resource {
    data: R;
    meta?: MetaData | undefined;
};

export type PaginatedMetaData<R extends Collectible = Collectible> = MetaData & Omit<R, 'data'>;

export interface ResponseDataCollection<R extends Collectible | undefined = undefined> extends ResourceData {
    data: R extends Collectible ? R['data'] : R;
    meta?: R extends Collectible ? PaginatedMetaData<R> | undefined : undefined;
};

/**
 * @description A type that represents the body of a response for a collection of resources. 
 * It can be either an array of ResourceData objects or a Collectible object, which contains an 
 * array of ResourceData objects. The type also includes the meta property, which is optional 
 * and can contain any additional metadata related to the response.
 * @example 
 * const collectionResponse: CollectionBody = {
 *   data: [
 *     { id: 1, name: 'Resource 1' },
 *     { id: 2, name: 'Resource 2' }
 *   ],
 *   meta: {
 *     pagination: {
 *       currentPage: 1,
 *       total: 2
 *     }
 *   }
 * };
 */
export type CollectionBody<R extends ResourceData[] | Collectible = ResourceData[]> = ResponseDataCollection<
    R extends Collectible ? R : { data: R }
>

/**
 * @description A type that represents the body of a response for a single resource. 
 * It can be either a ResourceData object or a NonCollectible object, which contains a 
 * ResourceData object. The type also includes the meta property, which is optional and can 
 * contain any additional metadata related to the response.
 * @example 
 * const resourceResponse: ResourceBody = {
 *   data: {
 *     id: 1,
 *     name: 'Resource Name',
 *     description: 'Resource Description'
 *   },
 *   meta: {
 *     timestamp: '2024-06-01T12:00:00Z'
 *   }
 * }; 
 */
export type ResourceBody<R extends ResourceData | NonCollectible = ResourceData> = ResponseData<
    R extends NonCollectible ? R : { data: R }
>

export type GenericBody<R extends NonCollectible | Collectible | ResourceData = ResourceData> = ResponseData<
    R
>

/**
 * @description A type that represents the pagination information for a collection of resources. It includes properties such as currentPage, from, to, perPage, total, firstPage, lastPage, prevPage, and nextPage. All properties are optional and can be undefined if not applicable.
 * @example 
 * const paginationInfo: Pagination = {
 *   currentPage: 1,
 *   from: 1,
 *   to: 10,
 *   perPage: 10,
 *   total: 100,
 *   firstPage: 1,
 *   lastPage: 10,
 *   prevPage: null,
 *   nextPage: 2
 * };
 */
export interface Pagination {
    currentPage?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
    perPage?: number | undefined;
    total?: number | undefined;
    firstPage?: number | undefined;
    lastPage?: number | undefined;
    prevPage?: number | undefined;
    nextPage?: number | undefined;
}

/**
 * @description A type that represents the cursor information for pagination. It includes properties such as before and after, which are optional and can be undefined if not applicable. The before property represents the cursor for the previous page, while the after property represents the cursor for the next page.
 * @example
 * const cursorInfo: Cursor = {
 *   previous: 'cursor-for-previous-page',
 *   next: 'cursor-for-next-page'
 * };
 */
export interface Cursor {
    previous?: string | undefined;
    next?: string | undefined;
}