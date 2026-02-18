import { JsonResource } from "src";
import { Resource } from "src/types";

/**
 * ApiResource function to return the JsonResource instance
 * 
 * @param instance JsonResource instance
 * @returns JsonResource instance
 */
export function ApiResource<R extends Resource> (instance: JsonResource<R>): JsonResource<R> {
    return instance;
}