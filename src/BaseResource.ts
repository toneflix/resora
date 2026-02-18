import { Resource } from "src";
import { Resource } from "src/types";

/**
 * BaseResource function to create a Resource instance
 * 
 * @param rsc Resource instance
 * @returns Resource instance
 */
export default function BaseResource<R extends Resource> (rsc: R): Resource<R> {
    return new Resource<R>(rsc);
}