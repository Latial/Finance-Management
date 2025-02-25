import {createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString} from "nuqs/server";
import {HistoryResponse} from "@/lib/redux/api/api";
import {parseAsIdAndExpendNameObject, parseAsSortString} from "@/lib/filter-util";


interface Context {
    historyResponse: HistoryResponse[];
}

function createHistoryFilterDefinition(context: Context) {
    const historyParser = parseAsIdAndExpendNameObject(context.historyResponse);

    const historyFilterDefinition = {
        page: parseAsInteger.withDefault(0),
        size: parseAsInteger.withDefault(9),
        sort: parseAsSortString.withDefault({sortBy: 'id', sortDirection: 'asc'}),
        title: parseAsString.withDefault(''),

        historyResponse: parseAsArrayOf(historyParser).withDefault([]),
    };


    const historySearchParamsCache = createSearchParamsCache(historyFilterDefinition);

    return {
        historyFilterDefinition,
        historySearchParamsCache
    }
}


export default createHistoryFilterDefinition;