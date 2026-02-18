import { Collectible, ResourceData } from "src/types";
import { describe, expect, it } from "vitest";

import { JsonResource } from "src";
import { JsonResourceCollection } from "src/JsonResourceCollection";

describe('Core', () => {
    it('should create a JsonResource instance', () => {
        const resource = { id: 1, name: 'Test Resource' };
        const jsonResource = new JsonResource(resource);

        expect(jsonResource).toBeInstanceOf(JsonResource);
    });

    it('should return the original resource data', () => {
        const resource = { id: 1, name: 'Test Resource' };
        const jsonResource = new JsonResource(resource);

        expect(jsonResource.data()).toEqual(resource);
    });

    it('should convert resource to JSON response format', () => {
        const resource = { id: 1, name: 'Test Resource' };
        const jsonResource = new JsonResource(resource);

        expect((jsonResource as any).json().body).toEqual({ data: resource });
    });

    it('should allow chaining of methods', () => {
        const resource = { id: 1, name: 'Test Resource' };
        const jsonResource = new JsonResource(resource);

        expect(jsonResource.additional({ meta: 'test' }).body).toEqual({
            data: resource,
            meta: 'test',
        });
    });

    it('should build a response object', () => {
        const resource = { id: 1, name: 'Test Resource' };
        const jsonResource = new JsonResource(resource);

        const response = jsonResource.response({} as any);
        expect(response).toBeInstanceOf(Object);
    });

    it('should allow chaining with async/await', async () => {
        const resource = { id: 1, name: 'Test Resource' };
        const jsonResource = new JsonResource(resource);

        const response = await jsonResource.then(res => res);
        expect(response).toEqual({ data: resource });
    });
});

describe('Extending Resources', () => {
    it('should allow extending the JsonResource class', () => {
        class CustomResource extends JsonResource {
            data () {
                return this.toArray();
            }
        }

        const resource = { id: 1, name: 'Test Resource' };
        const customResource = new CustomResource(resource);

        expect(customResource).toBeInstanceOf(JsonResource);
        expect(customResource.data()).toEqual(resource);
    });

    it('should handle custom data in the extended class', () => {
        class CustomResource extends JsonResource {
            data () {
                return {
                    id: this.id,
                    name: this.name,
                    custom: 'data'
                };
            }
        }

        const resource = { id: 1, name: 'Test Resource' };
        const customResource = new CustomResource(resource);

        expect(customResource.data()).toEqual({ id: 1, custom: 'data', name: 'Test Resource' });
    });

    it('should allow chaining of methods in extended classes', () => {
        class CustomResource extends JsonResource {
            data () {
                return this.toArray();
            }
        }

        const resource = [{ id: 1, name: 'Test Resource' }];
        const customResource = new CustomResource(resource);

        expect(customResource.additional({ meta: 'test' }).body).toEqual({
            data: [{ id: 1, name: 'Test Resource' }],
            meta: 'test',
        });
    });
});

describe('Extending Collections', () => {
    it('should handle non paginated collections', () => {
        class CustomResource extends JsonResource {
            data () {
                return {
                    id: this.id,
                    name: this.name,
                    custom: 'data'
                };
            }
        }

        class CustomCollection<R extends ResourceData[]> extends JsonResourceCollection<R> {
            collects = CustomResource;

            data () {
                return this.toArray();
            }
        }

        const resource = [{ id: 1, name: 'Test Resource' }];
        const customResource = new CustomCollection(resource);
        expect((<any>customResource).json().body).toEqual({ data: [{ id: 1, name: 'Test Resource', custom: 'data' }] });
    });

    it('should handle pagination in collections', () => {
        class CustomResource extends JsonResource {
            data () {
                return {
                    id: this.id,
                    name: this.name,
                    custom: 'data'
                };
            }
        }

        class CustomCollection<R extends Collectible> extends JsonResourceCollection<R> {
            collects = CustomResource;

            data () {
                return this.toArray();
            }
        }

        const resource = { data: [{ id: 1, name: 'Test Resource' }], pagination: { currentPage: 1, total: 10 } };
        const customResource = new CustomCollection(resource);

        expect((<any>customResource).json().body).toEqual({
            data: [{ id: 1, name: 'Test Resource', custom: 'data' }],
            meta: { pagination: resource.pagination },
        });
    });

    it('should handle cursor pagination in collections', () => {
        class CustomResource extends JsonResource {
            data () {
                return {
                    id: this.id,
                    name: this.name,
                    custom: 'data'
                };
            }
        }

        class CustomCollection<R extends Collectible> extends JsonResourceCollection<R> {
            collects = CustomResource;

            data () {
                return this.toArray();
            }
        }

        const resource = { data: [{ id: 1, name: 'Test Resource' }], cursor: { previous: 'abc', next: 'def' } };
        const customResource = new CustomCollection(resource);

        expect((<any>customResource).json().body).toEqual({
            data: [{ id: 1, name: 'Test Resource', custom: 'data' }],
            meta: { cursor: resource.cursor },
        });
    });

    it('should handle both pagination and cursor in collections', () => {
        class CustomResource extends JsonResource {
            data () {
                return {
                    id: this.id,
                    name: this.name,
                    custom: 'data'
                };
            }
        }

        class CustomCollection<R extends Collectible> extends JsonResourceCollection<R> {
            collects = CustomResource;

            data () {
                return this.toArray();
            }
        }

        const resource = {
            data: [{ id: 1, name: 'Test Resource' }],
            pagination: { currentPage: 1, total: 10 },
            cursor: { previous: 'abc', next: 'def' }
        };
        const customResource = new CustomCollection(resource);

        expect((<any>customResource).json().body).toEqual({
            data: [{ id: 1, name: 'Test Resource', custom: 'data' }],
            meta: { pagination: resource.pagination, cursor: resource.cursor },
        });
    });

    it('should allow chaining of methods in extended collection classes', () => {
        class CustomResource extends JsonResource {
            data () {
                return {
                    id: this.id,
                    name: this.name,
                    custom: 'data'
                };
            }
        }

        class CustomCollection<R extends Collectible> extends JsonResourceCollection<R> {
            collects = CustomResource;

            data () {
                return this.toArray();
            }
        }

        const resource = { data: [{ id: 1, name: 'Test Resource' }] };
        const customResource = new CustomCollection(resource);

        expect(customResource.additional({ meta: 'test' }).body).toEqual({
            data: [{ id: 1, name: 'Test Resource', custom: 'data' }],
            meta: 'test',
        });
    });
}); 