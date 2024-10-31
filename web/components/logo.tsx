import {Button} from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export function Logo() {
    return (
        <Link href={'/'}>
            <Button size="icon" className='flex-shrink-0'>
                <h1 className="text-3xl font-bold flex justify-center items-center">FM</h1>
            </Button>
        </Link>

    );
}