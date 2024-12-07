import React from 'react'
import fetchJson from "@/lib/fetch";
import {GetWholeHistoryApiResponse} from "@/lib/redux/api/api";

export default async function History() {
    const history = await fetchJson<GetWholeHistoryApiResponse>(`/api/history`);
    return (
        <div className="p-5 bg-[#191917] rounded-3xl">
            <h1 className="text-2xl font-bold flex items-center mb-10">
                Expanses
            </h1>
            {history.map((single, index) =>
                <div className="flex flex-row items-center gap-5">
                    <p>{single.id}</p>
                    <p>{single.date}</p>
                    <p className="text-xl">{single.type.type}</p>
                    <h4 className="text-xl">{single.expendName}</h4>
                    <p className="text-xl">${single.expendPrice}</p>
                    <p className="text-xl">{single.type.type}</p>
                </div>
            )}
        </div>
    )
}