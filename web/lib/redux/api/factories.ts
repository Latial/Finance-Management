import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
import config from "@/lib/config";

const baseQuery = fetchBaseQuery({
    baseUrl: config.BASE_API_PATH,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN_KEY)
        if (token) {
            headers.set(config.AUTHORIZATION_HEADER_NAME, `${config.BEARER_TOKEN_IDENTIFIER} ${token}`)
        }
        return headers
    },
})

const createFetchBaseQuery = () => {
    const baseQueryWithRedirection: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
        args,
        api,
        extraOptions,
    ) => {
        // TODO: Redirect to sign-in page if 401 or 403
        return baseQuery(args, api, extraOptions);
    }
    return baseQueryWithRedirection
}
export {createFetchBaseQuery}