"use client"
import React from "react";
import {Variants} from "framer-motion";
import {HistoryResponse} from "@/lib/redux/api/api";
import RemoveExpend from "@/app/profile/[id]/(root)/expanses/removeExpend";


interface Props {
    history: HistoryResponse[]
}

export default function HistoryList(props: Props) {
    const variants: Variants = {
        hidden: {opacity: 0, y: 20},
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 * index
            }
        })
    };

    const {
        history
    } = props;

    return <div className="grid grid-cols-1 w-full border-none">
        {history.map((history, i) => {
            return <div className="col-span-1 text-center" key={i}>
                <div className="flex flex-row items-center gap-6 space-y-3">
                    <p className="text-xl mt-3">{history.id}</p>
                    <h4 className="text-xl">{history.expendName}</h4>
                    <p className="text-xl">${history.expendPrice}</p>
                    <p className="text-xl">{new Date(history.date).toLocaleDateString()}</p>
                    <p className="text-xl">{history.type.type}</p>
                </div>
            </div>
        })}
    </div>
}