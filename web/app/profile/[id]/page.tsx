import React from "react";
import {TextIcon} from "lucide-react";


export default function ProfilePage() {
    return <div className="p-5 bg-[#191917]">
        <h1 className="text-2xl font-bold flex items-center mb-10">
            <TextIcon className="h-5 w-5 mr-2"/>
            About
        </h1>

        <div className="prose dark:prose-invert">
            {new Array(10).fill(0).map((_, index) => (
                <p key={index}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in erat ac nunc pulvinar
                    fermentum. Nullam nec mi sit amet nisi tincidunt tincidunt. Nullam nec mi sit amet nisi
                    tincidunt tincidunt. Nullam nec mi sit amet nisi tincidunt tincidunt.
                </p>
            ))}
        </div>
    </div>
}