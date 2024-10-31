"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
//import MenuOverlay from './MenuOverlay';
import { motion } from "framer-motion";
import {Button} from "@/components/ui/button";
import {FaUser} from 'react-icons/fa'
import {useGetProfileQuery} from "@/lib/redux/api/api";
/*import ProfileDropdown from "@/components/profile-dropdown";
import {HeaderActions} from "@/components/header-action";
import CartMenu from "@/components/common/Cart-Menu";*/


const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
}

const NavBar = () => {
    return (
        <NavigationMenu className="w-full flex max-w-full mt-10 lg:mt-0">
            <NavigationMenuList className="flex flex-col w-full items-center justify-center max-w-full  lg:flex-row   ">
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/history" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Expends
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/jobs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            History
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
export default NavBar;