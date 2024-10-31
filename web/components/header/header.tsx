import React from 'react'
import NavBar from "@/components/header/NavBar";
import {HeaderActions} from "@/components/header/header-actions";
import {BurgerMenu} from "@/components/burger-menu";
import {Logo} from "@/components/logo";
export default function Header() {
    return (
        <header
            className="bg-[#111111] text-foreground flex items-center p-5 gap-5 justify-between shadow sticky top-0 border-b z-40">
            <div className="flex gap-5 items-center w-full">
                <BurgerMenu/>
                <Logo/>
                <div className="hidden lg:flex">
                    <NavBar/>
                </div>
            </div>
            <div className="gap-5 justify-center items-center text-nowrap">
                <HeaderActions/>
            </div>
        </header>
    )
}