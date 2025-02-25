import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {createSerializer} from "nuqs";


function calculateSurroundingPages(page: number, totalPages: number): number[] {
    const surroundingPages: number[] = [];
    if (page > 0) {
        surroundingPages.push(page - 1);
    }
    surroundingPages.push(page);
    if (page < totalPages - 1) {
        surroundingPages.push(page + 1);
    }
    return surroundingPages;
}


interface PaginationProps {
    totalPages: number;
    searchParams: any;
    basePath: string;
    filters: any;
}

export default function UrlPagination(props: PaginationProps) {
    const {totalPages, searchParams, basePath} = props;
    const query = searchParams
    const currentPage = query.page;

    const hasNextPage = currentPage < totalPages - 1;
    const hasPreviousPage = currentPage > 0;
    const surroundingPages = calculateSurroundingPages(currentPage, totalPages);


    const serialize = createSerializer(props.filters);

    const previousPage = serialize({
        ...query,
        page: currentPage - 1,
    });

    const nextPage = serialize({
        ...query,
        page: currentPage + 1,
    });

    const surroundingPagesQuery = surroundingPages.map((surroundingPage) => {
        return serialize({
            ...query,
            page: surroundingPage,
        });
    });

    return <Pagination className="mt-10">
        <PaginationContent className="w-full flex justify-end">
            {hasPreviousPage && <PaginationItem className="cursor-pointer">
                <PaginationPrevious href={`${basePath}${previousPage}`}/>
            </PaginationItem>}

            {surroundingPages.map((surroundingPage, i) => {
                const queryString = surroundingPagesQuery[i];
                const isCurrentPage = surroundingPage === query.page;

                return <PaginationItem
                    key={surroundingPage}
                    className={`cursor-pointer ${isCurrentPage ? "border-b-2 border-primary" : ""}`}>
                    <PaginationLink href={`${basePath}${queryString}`}>
                        {surroundingPage + 1}
                    </PaginationLink>
                </PaginationItem>
            })}
            {hasNextPage && <PaginationItem className="cursor-pointer">
                <PaginationNext href={`${basePath}${nextPage}`}/>
            </PaginationItem>}
        </PaginationContent>
    </Pagination>
}