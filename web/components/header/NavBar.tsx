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
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
//import MenuOverlay from './MenuOverlay';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { motion } from "framer-motion";
import {Button} from "@/components/ui/button";
import {FaUser} from 'react-icons/fa'
import {useGetProfileQuery} from "@/lib/redux/api/api";
/*import ProfileDropdown from "@/components/profile-dropdown";
import {HeaderActions} from "@/components/header-action";
import CartMenu from "@/components/common/Cart-Menu";*/


const navLink = [
    {
        title : "About",
        path : "/about"
    },
    {
        title : "Expends",
        path : "/expends"
    },
    {
        title : "Register",
        path : "/sign-up"
    },
    {
        title : "Log In",
        path : "/log-in"
    }
]
const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
}

const NavBar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-black py-2">

        </nav>
    )
}
export default NavBar;