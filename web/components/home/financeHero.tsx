"use client"

import React from 'react'
import {useDebounce} from "@/lib/hooks";
import {useGetProfileQuery} from "@/lib/redux/api/api";
import Link from "next/link";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function FinanceHero() {
    const [search, setSearch] = React.useState("");

    const debouncedSearch = useDebounce(search, 500);

    const currentAccountResponse = useGetProfileQuery({
        idOrMe : "me"
    })

    const isLoggedIn = currentAccountResponse.data !== undefined;
    return <div className="w-full min-h-full flex justify-center items-center flex-col">
        {isLoggedIn ?
            <h1 className= "text-3xl">Welcome back</h1>
            :
            <div>
                <h3 className="text-3xl">Welcome to our app, here you can track you expenses</h3>
                <p className="text-xl">Simply start by logging in or signing up if you dont have an account</p>
                <p className="text-xl">Then track everything from your profile</p>
                <Link href = "/sign-in">
                <Button variant= "secondaryGreen" className= "text-xl rounded-lg my-5">Log In</Button>
                </Link>
            </div>
        }
    </div>;
}