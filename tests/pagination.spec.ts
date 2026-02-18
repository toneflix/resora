import { describe, expect, it } from 'vitest'

import { Resource } from 'src'
import { ResourceCollection } from 'src/ResourceCollection'

describe('Resource Pagination', () => {
    it('should handle pagination data correctly', () => {
        const resource = {
            data: [{ id: 1 }, { id: 2 }],
            pagination: {
                total: 100,
                perPage: 10,
                currentPage: 1,
                lastPage: 10,
            },
        }

        const jsonResource = new ResourceCollection(resource)
        const jsonResponse = jsonResource.json().body

        expect(jsonResponse).toEqual({
            data: [{ id: 1 }, { id: 2 }],
            meta: {
                pagination: {
                    total: 100,
                    perPage: 10,
                    currentPage: 1,
                    lastPage: 10,
                },
            },
        })
    })

    it('should not include pagination meta for non-collection resources', () => {
        const resource = {
            id: 1,
            name: 'Test Resource',
            pagination: {
                total: 100,
                perPage: 10,
                currentPage: 1,
                lastPage: 10,
            },
        }

        const jsonResource = new Resource(resource)
        const jsonResponse = jsonResource.json().body
        expect(jsonResponse).toEqual({ data: resource })
    })

    it('should not include pagination meta if data is not an array', () => {
        const resource = {
            data: { id: 1, name: 'Test Resource' },
            pagination: {
                total: 100,
                perPage: 10,
                currentPage: 1,
                lastPage: 10,
            },
        }

        const jsonResource = new Resource(resource)
        const jsonResponse = jsonResource.json().body

        expect(jsonResponse).toEqual({ data: resource.data })
    })

    it('should handle empty data with pagination', () => {
        const resource = {
            data: [],
            pagination: {
                total: 0,
                perPage: 10,
                currentPage: 1,
                lastPage: 1,
            },
        }

        const jsonResource = new ResourceCollection(resource)
        const jsonResponse = jsonResource.json().body

        expect(jsonResponse).toEqual({
            data: [],
            meta: {
                pagination: {
                    total: 0,
                    perPage: 10,
                    currentPage: 1,
                    lastPage: 1,
                },
            },
        })
    })

    it('should not include pagination meta if pagination is missing', () => {
        const resource = {
            data: [{ id: 1 }, { id: 2 }],
        }

        const jsonResource = new ResourceCollection(resource)
        const jsonResponse = jsonResource.json().body

        expect(jsonResponse).toEqual({
            data: [{ id: 1 }, { id: 2 }],
        })
    })
})
