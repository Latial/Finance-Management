"use client"

import React from 'react'
import {useDebounce} from "@/lib/hooks";
import {useGetProfileQuery} from "@/lib/redux/api/api";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Tabs} from "@/components/tabs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card} from "@/components/ui/card";

export default function SideMenu() {

    const currentAccountResponse = useGetProfileQuery({
        idOrMe : "me"
    })

    const tabs = [
        {
            label: "Home",
            href: ``,
        },
        {
            label: "History",
            href: ``,
        },
        {
            label: "Expenses",
            href: ``,
        },
        {
            label: "Notes",
            href: ``,
        },
        {
            label: "one",
            href: ``,
        },
        {
            label: "one",
            href: ``,
        },
    ]

    const isLoggedIn = currentAccountResponse.data !== undefined;
    return <div className="py-10 container mx-auto">
        <div className="lg:grid lg:grid-cols-5 flex justify-center flex-row">
            <Card className="flex flex-col gap-6 p-5">
                <Avatar className="w-16 h-16 border">
                    <AvatarImage alt="Customer Name" src="/placeholder-user.jpg"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Tabs tabs={tabs}/>
                {/*<NoData/>*/}
            </Card>
            <div className="">
            </div>
        </div>
    </div>
}