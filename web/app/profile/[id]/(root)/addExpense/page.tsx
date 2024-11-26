import React from "react"
import fetchJson from "@/lib/fetch";
import {GetAllExpendTypesApiResponse} from "@/lib/redux/api/api";
import ExpendType from "@/app/profile/[id]/(root)/addExpense/expendTypes/page";
import {Checkbox} from "@/components/ui/checkbox";

export default async function AddExpend(){

    const expendTypes = await fetchJson<GetAllExpendTypesApiResponse>('/api/expendType')

    return (
        <div className= "flex flex-col">
            <ExpendType/>
            <div className= "flex flex-col gap-4 mt-3">
            </div>
        </div>
    )
}