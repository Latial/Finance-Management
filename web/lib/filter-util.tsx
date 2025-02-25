import {createParser} from "nuqs";

type Sort = {
    sortBy: string;
    sortDirection: 'asc' | 'desc';
}


const parseAsSortString = createParser<Sort>({
    parse(queryValue) {
        const [sortBy, sortDirection] = queryValue.split(',');

        return {
            sortBy,
            sortDirection: sortDirection as 'asc' | 'desc'
        }
    },
    serialize(value) {
        return `${value.sortBy},${value.sortDirection}`;
    }
})


interface IdAndExpendName {
    id: number;
    expendName: string;
}

export function parseAsIdAndExpendNameObject(items: IdAndExpendName[]) {
    return createParser<IdAndExpendName>({
        parse(queryValue) {
            const item = items.find(item => item.id === parseInt(queryValue));

            return {
                id: parseInt(queryValue),
                expendName: item?.expendName || 'UNKNOWN'
            }
        },
        serialize(value: IdAndExpendName) {
            return value['id'].toString();
        }
    });
}


export {
    parseAsSortString
}