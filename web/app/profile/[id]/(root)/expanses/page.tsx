import React from 'react'
import {AiFillHeart} from "react-icons/ai";
import fetchJson from "@/lib/fetch";
import {GetAllExpendsApiResponse} from "@/lib/redux/api/api";

export default async function Expanses() {
    const expends = await fetchJson<GetAllExpendsApiResponse>(`/api/expend`);
    return (
        <div className="p-5 bg-[#191917] rounded-3xl">
            <h1 className="text-2xl font-bold flex items-center mb-10">
                Expanses
            </h1>
            {expends.map((expend, index) =>
                <div className= "flex flex-row items-center gap-5">
                    <p>{expend.id}</p>
                    <h4 className= "text-xl">{expend.name}</h4>
                    <p className= "text-xl">{expend.price}</p>
                    <p className= "text-xl">{expend.type.type}</p>
                </div>
            )}
            <div className="prose rounded-3xl dark:prose-invert grid grid-cols-4 gap-5">

            </div>
        </div>
    )
}