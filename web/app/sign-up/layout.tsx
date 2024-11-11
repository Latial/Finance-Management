"use client";
import Link from "next/link";
import React from "react";
import {Card} from "@/components/ui/card";
import {usePathname} from "next/navigation";
import NavBar from "@/components/header/NavBar";

interface Props {
    children: React.ReactNode;
}


function SignUpLink({href, children, isActive}: { href: string, children: React.ReactNode, isActive: boolean }) {
    return <Link href={href}
                 className={`bg-card rounded flex items-center justify-center p-2 w-full ${isActive ? "bg-secondary" : ""}`}>
        {children}
    </Link>
}


export default function SignUpLayout({children}: Props) {
    const pathname = usePathname();

    const isUser = pathname === "/sign-up";
    return <>
        <main className="container mx-auto flex justify-center py-10">
            <div className="flex justify-center items-center flex-col w-5/6 md:w-2/3 xl:w-1/3 bg-[#141414] rounded-2xl">
                <Card className="p-10 border-none relative w-full mt-2">
                    {children}
                </Card>
            </div>
        </main>
    </>

}