"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";
import React from "react";

interface Props {
    tabs: {
        label: string
        href: string
    }[]
}

export function Tabs({tabs}: Props) {
    const pathname = usePathname()

    return <div className="flex gap-10 mr-10 border-b-background flex-col text-left">
        {tabs.map((tab, i) => {
            const isActive = pathname == tab.href
            return <Link href={tab.href} key={i}
                         className={`pb-2 px-5 text-center py-2 text-sm ${isActive ? "border-2 border-primary rounded-xl" : ""}`}>
                {tab.label}
            </Link>
        })}
    </div>;
}