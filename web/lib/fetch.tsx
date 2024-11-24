import config from "@/lib/config";
import {headers} from "next/headers";


export default async function fetchJson<T>(url: string, cache: RequestCache = "no-cache"): Promise<T> {
    const isFullUrl = url.startsWith(config.BASE_API_PATH);
    const fullUrl = isFullUrl ? url : `${config.BASE_API_PATH}${url}`;

    const response = await fetch(fullUrl, {
        cache,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }


    return await response.json() as T;
}