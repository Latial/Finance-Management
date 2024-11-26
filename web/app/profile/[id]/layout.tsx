import React from 'react'
import {useDebounce} from "@/lib/hooks";
import {useGetProfileQuery, UserProfileResponse} from "@/lib/redux/api/api";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Tabs} from "@/components/tabs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card} from "@/components/ui/card";
import fetchJson from "@/lib/fetch";


interface Props {
    children : React.ReactNode,
    params : {
        id: number
    }
}

export default async function Profile(props : any) {

    const {
        children,
        params : {id},
    } = props

    const profile = await fetchJson<UserProfileResponse>(`/api/profile/${id}`)

    const userData = {
        id: `${profile.id}`,
        email: `${profile.email}`,
        firstName : `${profile.firstName}`,
        lastName : `${profile.lastName}`
    }

    const tabs = [
        {
            label: "Add Expanse",
            href: `/profile/${id}/addExpense`,
        },
        {
            label: "Home",
            href: `/profile/${id}`,
        },
        {
            label: "History",
            href: `/profile/${id}/history`,
        },
        {
            label: "Expenses",
            href: `/profile/${id}/expanses`,
        },
        {
            label: "Notes",
            href: `/profile/${id}/notes`,
        },
    ]

    return (
        <>
            <div className="py-10 container mx-auto">
                <div className="lg:grid lg:grid-cols-2 flex justify-center flex-col">
                    <div className="xl:col-span-9 col-span-8">
                        <Card className="flex flex-col gap-6 p-5">
                            <div className= "flex flex-row gap-4 justify-center lg:justify-start items-center">
                                <Avatar className="w-16 h-16 border">
                                    <AvatarImage alt="Customer Name" src="/placeholder-user.jpg"/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p>{userData.firstName}</p>
                            </div>
                            <div className= "flex flex-col lg:flex-row gap-6 p-5">
                                <Tabs tabs={tabs}/>
                                {children}
                            </div>
                            {/*<NoData/>*/}
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )

}