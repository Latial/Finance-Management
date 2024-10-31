import React from "react";
import {twMerge} from "tailwind-merge";
export interface FullPageSectionProps {
    children: React.ReactNode;
    className?: string;
}

export function FullPageSection({children, className}: FullPageSectionProps) {
    return <section className={twMerge( "lg:min-h-[calc(100vh-10rem)] min-h[calc(80vh-10rem)] w-full flex", className)}>
        {children}
    </section>

}