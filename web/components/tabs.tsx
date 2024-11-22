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

    return <div className="flex gap-10 lg:border-b-2 border-b-background flex-col text-left">
        {tabs.map((tab, i) => {
            const isActive = pathname == tab.href
            return <Link href={tab.href} key={i}
                         className={`pb-2 px-5 text-sm ${isActive ? "border-b-2 border-primary" : ""}`}>
                {tab.label}

            </Link>
        })}
    </div>;
}