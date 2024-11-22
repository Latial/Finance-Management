"use client"

import React from 'react'
import {useDebounce} from "@/lib/hooks";
import {useGetProfileQuery} from "@/lib/redux/api/api";
import Link from "next/link";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function FinanceSearch() {
    const [search, setSearch] = React.useState("");

    const debouncedSearch = useDebounce(search, 500);

    const currentAccountResponse = useGetProfileQuery({
        idOrMe : "me"
    })

    const isLoggedIn = currentAccountResponse.data !== undefined;
    return <div className="w-full xl:w-2/3 min-h-full flex justify-start items-start flex-col">
        {isLoggedIn ?
            <div>
                <p>You can search your history here</p>
            </div>
            :
            <div>
                <p>Please log in or sign up to save your expenses. Otherwise we can't guarantee they will stay forever</p>
            </div>
        }
    </div>;
}