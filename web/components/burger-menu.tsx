"use client"


import {Menu} from "lucide-react";
import React from "react";
import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import NavBar from "@/components/header/NavBar";
import {NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {ModeToggle} from "@/components/mode-toggle";
import {useGetProfileQuery} from "@/lib/redux/api/api";

export function BurgerMenu() {

    const accountResponse = useGetProfileQuery({
        idOrMe: "me"
    });
    const isLoggedIn = accountResponse.isSuccess;

    return <Sheet>
        <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="lg:hidden flex">
                <Menu/>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
            <SheetHeader>
                <SheetTitle>FinanceManager</SheetTitle>
                <SheetDescription>
                    Manage your spendings
                </SheetDescription>
            </SheetHeader>

            <NavBar/>
            {!isLoggedIn &&
                <Link href="/sign-up" legacyBehavior passHref>
                    Sign Up
                </Link>
            }
            {!isLoggedIn &&
                <Link href="/sign-in" legacyBehavior passHref>
                    <Button>
                        Log In
                    </Button>
                </Link>}

        </SheetContent>
    </Sheet>

}