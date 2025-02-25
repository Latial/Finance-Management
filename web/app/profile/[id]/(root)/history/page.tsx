import React from 'react'
import fetchJson from "@/lib/fetch";
import UrlPagination from "@/components/url-pagination";
import {GetWholeHistoryApiResponse, HistoryResponse, PageHistoryResponse} from "@/lib/redux/api/api";
import {createSerializer} from "nuqs";
import createHistoryFilterDefinition from "@/lib/history-filter-definition";
import HistoryList from "@/app/profile/[id]/(root)/history/history-list";

interface Props {
    searchParams: Record<string, string | string[] | undefined>
}
export default async function History(props: Props) {
    const historyResponse = await fetchJson<HistoryResponse[]>(`/api/history`);
    const {
        historyFilterDefinition,
        historySearchParamsCache
    } = createHistoryFilterDefinition({historyResponse})
    const searchParams = historySearchParamsCache.parse(props.searchParams);
    const serialize = createSerializer(historyFilterDefinition);
    const params = serialize(searchParams);
    const history = await fetchJson<PageHistoryResponse>(`/api/history${params}`);
    return <>
        <div className="p-5 bg-[#191917] rounded-3xl">
            <h1 className="text-2xl font-bold flex items-center mb-10">
                History
            </h1>
            <div className="flex gap-5">
                <HistoryList history={history.content!}/>
            </div>
            <UrlPagination
                totalPages={history.totalPages || 0}
                searchParams={searchParams}
                basePath={'/profile/52/history'}
                filters={historyFilterDefinition}
            />
        </div>
    </>
}