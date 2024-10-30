import {createApi} from '@reduxjs/toolkit/query/react';
import {createFetchBaseQuery} from '@/lib/redux/api/factories';

export const emptySplitApi = createApi({
    baseQuery : createFetchBaseQuery(),
    endpoints : () => ({}),
})