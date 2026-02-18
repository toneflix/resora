import { describe, expect, it } from "vitest";

import { JsonGenericResource } from "src/JsonGenericResource";
import { ResourceData } from "src/types";

describe('Generic Core', () => {
    it('should create a JsonResource instance with correct data', () => {
        const resourceData: ResourceData = { id: 1, name: 'Test Resource' };
        const jsonResource = new JsonGenericResource(resourceData);

        expect(jsonResource).toBeInstanceOf(JsonGenericResource);
        expect(jsonResource.data()).toEqual(resourceData);
    });

    it('should allow access to resource properties directly on the instance', () => {
        const resourceData: ResourceData = { id: 2, name: 'Another Resource' };
        const jsonResource = new JsonGenericResource(resourceData);

        expect(jsonResource.id).toBe(2);
        expect(jsonResource.name).toBe('Another Resource');
    });

    it('should allow setting properties directly on the instance', () => {
        const resourceData: ResourceData = { id: 3, name: 'Third Resource' };
        const jsonResource = new JsonGenericResource(resourceData);

        jsonResource.name = 'Updated Resource';
        expect(jsonResource.name).toBe('Updated Resource');
        expect(jsonResource.data().name).toBe('Updated Resource');
    });
}); 