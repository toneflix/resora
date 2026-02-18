import { beforeEach, describe, expect, it } from "vitest";

import { Resource } from "src";
import { ResourceCollection } from "src/ResourceCollection";
import express from "express";
import supertest from "supertest";

let app: express.Application;

describe('Connect-style Requests (Express)', () => {
    beforeEach(() => {
        app = express()
    })

    it('should output correct JSON response', async () => {
        const resource = { id: 1, name: 'Test Resource' };
        app.get('/test', async (req, res) => {
            return await new Resource(resource, res).json();
        });

        const response = await supertest(app).get('/test');
        expect(response.body).toEqual({ data: resource });
    })

    it('should allow chaining of methods', async () => {
        const resource = { id: 1, name: 'Test Resource' };
        app.get('/test', async (req, res) => {
            return await new Resource(resource, res).additional({ meta: 'test' });
        });

        const response = await supertest(app).get('/test');
        expect(response.body).toEqual({
            data: resource,
            meta: 'test',
        });
    });

    it('should allow chaining with async/await', async () => {
        const resource = { id: 1, name: 'Test Resource' };
        app.get('/test', async (req, res) => {
            return await new Resource(resource, res).json();
        });

        const response = await supertest(app).get('/test');
        expect(response.body).toEqual({ data: resource });
    });

    it('should allow setting response headers', async () => {
        const resource = { id: 1, name: 'Test Resource' };
        app.get('/test', async (req, res) => {
            return await new Resource(resource, res)
                .response()
                .header('X-Custom-Header', 'CustomValue');
        });

        const response = await supertest(app).get('/test');
        expect(response.headers['x-custom-header']).toEqual('CustomValue');
    });

    it('should allow setting cookies', async () => {
        const resource = { id: 1, name: 'Test Resource' };
        app.get('/test', async (req, res) => {
            return await new Resource(resource, res)
                .response()
                .setCookie('testCookie', 'testValue', { path: '/', maxAge: 3600 });
        });

        const response = await supertest(app).get('/test');
        expect(response.headers['set-cookie'][0]).toContain('testCookie=testValue');
    });

    it('should allow setting status code', async () => {
        const resource = { id: 1, name: 'Test Resource' };
        app.get('/test', async (req, res) => {
            return await new Resource(resource, res)
                .response()
                .setStatusCode(201);
        });

        const response = await supertest(app).get('/test');
        expect(response.status).toEqual(201);
    });

    it('should include pagination meta if data is an array and pagination is provided', async () => {
        const resource = {
            data: [{ id: 1, name: 'Test Resource' }],
            pagination: {
                total: 100,
                perPage: 10,
                currentPage: 1,
                lastPage: 10,
            },
        };

        app.get('/test', async (req, res) => {
            return await new ResourceCollection(resource, res).json();
        });

        const response = await supertest(app).get('/test');
        expect(response.body).toEqual({
            data: resource.data,
            meta: {
                pagination: resource.pagination,
            },
        });
    });

    it('should not include pagination meta if data is not an array', async () => {
        const resource = { data: { id: 1, name: 'Test Resource' } };

        app.get('/test', async (req, res) => {
            return await new Resource(resource, res).json();
        });

        const response = await supertest(app).get('/test');
        expect(response.body).toEqual({ data: resource.data });
    });

    it('should handle empty data with pagination', async () => {
        const resource = {
            data: [],
            pagination: {
                total: 0,
                perPage: 10,
                currentPage: 1,
                lastPage: 1,
            },
        };

        app.get('/test', async (req, res) => {
            return await new ResourceCollection(resource, res).json();
        });

        const response = await supertest(app).get('/test');
        expect(response.body).toEqual({
            data: resource.data,
            meta: {
                pagination: resource.pagination,
            },
        });
    });
});
