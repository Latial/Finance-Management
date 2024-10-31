
"use client"

import {Button} from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {useGetProfileQuery} from "@/lib/redux/api/api";
import ProfileDropdown from "@/components/header/profile-dropdown";
import {ModeToggle} from "@/components/mode-toggle";

export function HeaderActions() {

    const accountResponse = useGetProfileQuery({
        idOrMe: "me"
    });
    const isLoggedIn = accountResponse.isSuccess;

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {isLoggedIn && <ProfileDropdown account={accountResponse.data}/>}

                <div className="hidden lg:flex gap-2">
                    {!isLoggedIn && <NavigationMenuItem>
                        <Link href="/sign-up" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Sign Up
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>}
                    {!isLoggedIn && <NavigationMenuItem>
                        <Link href="/sign-in" legacyBehavior passHref>
                            <Button variant= "orange">
                                Log In
                            </Button>
                        </Link>
                    </NavigationMenuItem>}
                    {!isLoggedIn && <NavigationMenuItem>
                        <ModeToggle/>
                    </NavigationMenuItem>}
                </div>

            </NavigationMenuList>
        </NavigationMenu>
    );

}
