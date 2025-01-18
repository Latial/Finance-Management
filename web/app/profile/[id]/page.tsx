import React from "react";
import {TextIcon} from "lucide-react";
import ShowStatsMonth from "@/components/ShowStatsMonth";
import fetchJson from "@/lib/fetch";
import {GetAllExpendsApiResponse, GetWholeHistoryApiResponse} from "@/lib/redux/api/api";


// @ts-ignore
export default async function ProfilePage(locale) {
    const expends = await fetchJson<GetAllExpendsApiResponse>(`/api/expend`);

    const getStartOfWeek = () => {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday
        console.log(firstDayOfWeek)
        firstDayOfWeek.setHours(0, 0, 0, 0); // Start of day
        return firstDayOfWeek;
    };

    const getEndOfWeek = () => {
        const today = new Date();
        const lastDayOfWeek = new Date(today.setDate(today.getDate()) + 1); // Sunday
        console.log(lastDayOfWeek)
        lastDayOfWeek.setHours(23, 59, 59, 999); // End of day
        return lastDayOfWeek;
    };

    const startOfWeek = getStartOfWeek();
    const endOfWeek = getEndOfWeek();


    return <>
        <div className= "flex flex-col justify-around">
            <div className="flex flex-row space-x-7 gap-16">
                <div className="p-5 bg-[#191917] rounded-3xl">
                    <h1 className="text-2xl font-bold flex items-center mb-10">
                        Recently added
                    </h1>
                    <div className="flex flex-col  items-start gap-5">
                        <p className="text-xl">Item 0</p>
                        <p className="text-xl">Item 0</p>
                        <p className="text-xl">Item 0</p>
                        <p className="text-xl">Item 0</p>
                    </div>
                    <p></p>
                </div>
                <div className="p-5 bg-[#191917] rounded-3xl">
                    <h1 className="text-2xl font-bold flex items-center mb-10">
                        Expanses this week
                    </h1>
                    {expends
                        .filter(single => {
                            const date = new Date(single.date);
                            return date >= startOfWeek && date <= endOfWeek;
                        })
                        .map((single, index) => (
                            <div className="flex flex-row items-center gap-5" key={index}>
                                <p>{single.id}</p>
                                <p>{new Date(single.date).toLocaleDateString()} ({new Date(single.date.toString()).toLocaleDateString(locale, { weekday: 'long' })})</p>
                                <p className="text-xl">{single.type.type}</p>
                                <h4 className="text-xl">{single.name}</h4>
                                <p className="text-xl">${single.price}</p>
                            </div>
                        ))}
                </div>
            </div>
            <ShowStatsMonth dataHistory = {expends.filter(single => {
                const date = new Date(single.date);
                return date >= startOfWeek && date <= endOfWeek;
            })}/>
        </div>
    </>
}