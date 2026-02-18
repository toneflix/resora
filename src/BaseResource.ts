import { JsonResource } from "src";
import { Resource } from "src/types";

/**
 * BaseResource function to create a JsonResource instance
 * 
 * @param rsc Resource instance
 * @returns JsonResource instance
 */
export default function BaseResource<R extends Resource> (rsc: R): JsonResource<R> {
    return new JsonResource<R>(rsc);
}