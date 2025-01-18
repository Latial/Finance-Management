"use client"

import React, {useEffect, useState} from 'react'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import { cn } from "@/lib/utils"
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import fetchJson from "@/lib/fetch";
import {Checkbox} from "@/components/ui/checkbox";
import { Toast } from "@/components/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {StatisticsResponse, useExpanseAloneMutation, useHistoryMutation, useStatsMutation} from "@/lib/redux/api/api";
import config from "@/lib/config";
import {jwtDecode} from "jwt-decode";
import {useJwt} from "react-jwt";
import {useParams} from "react-router";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Check, ChevronsUpDown} from "lucide-react";
import {PieChart} from "@mui/x-charts/PieChart";
import {axisClasses, BarChart, barElementClasses} from "@mui/x-charts";
import {watch} from "node:fs";

const formSchema = z.object ({
    month: z.string({
        required_error: "Please select a language.",
    }),
    year: z.string({
        required_error: "Please select a year.",
    }),
})
// @ts-ignore
export default function ShowStatsMonth(dataHistory) {
    const[addStat, statResult] = useStatsMutation();
    const [data, setData] = useState<StatisticsResponse | undefined>(undefined);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const path = window.location.pathname; // "/profile/52/addExpense"
            const id = path.split('/')[2];
            const result = await addStat({
                statsRequest: {
                    userId : id,
                    month : values.month,
                    year : values.year
                }
            })
            setData(result.data)

            if ("data" in result) {
                Toast({
                    title: `Item:`
                    /*description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                          <code className="text-white">Added successfully</code>
                        </pre>
                    ),*/
                })
            }
            console.log(result)
        } catch (error) {

        }
    }
    const months = [
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "September", value: "9" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" }
    ] as const
    const years = [
        { label: "2024", value: "2024" },
        { label: "2025", value: "2025" },
    ]
    const labels: string[] = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'];
    const lData: number[] = [42, 24, 56, 45, 3];
    const rData: number[] = [57, 7, 19, 16, 22];
    const colors: string[] = ['#006904', '#013C5E', '#560d0d'];
    const colors2 : string[] = ['#006904', '#013C5E', '#560d0d', "red", "purple", "orange", "grey"]
    const weeklyPrices: number[] = Array(7).fill(0); // Initialize with zeroes

// Safely map prices to the corresponding day and sum them
    // @ts-ignore
    dataHistory.dataHistory.forEach((single) => {
        let dayIndex = new Date(single.date).getDay() - 1; // Adjust index for Monday start (0=Monday, 6=Sunday)
        if (dayIndex < 0) dayIndex = 6; // Adjust Sunday to the last index (6)

        // Add the parsed expendPrice to the corresponding day's total sum
        const price = parseFloat(single.price);
        if (!isNaN(price)) {
            weeklyPrices[dayIndex] += price;
        }
    });
    const seriesData = [{ data: weeklyPrices }];
    console.log(seriesData)
    return (
        <>
            <div className="flex flex-row mt-5 gap-32 p-5 bg-[#191917] rounded-3xl">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold flex items-center mb-10">
                        See monthly expends
                    </h1>
                    <div className="prose rounded-3xl dark:prose-invert w-full">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="month"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Month</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-[200px] justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? months.find(
                                                                    (month) => month.value === field.value
                                                                )?.label
                                                                : "Select month"}
                                                            <ChevronsUpDown
                                                                className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search month..."/>
                                                        <CommandList>
                                                            <CommandEmpty>No language found.</CommandEmpty>
                                                            <CommandGroup className="myself">
                                                                {months.map((month) => (
                                                                    <CommandItem
                                                                        value={month.label}
                                                                        key={month.value}
                                                                        onSelect={() => {
                                                                            form.setValue("month", month.value)
                                                                        }}
                                                                    >
                                                                        {month.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                month.value === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                This is the month that has stats displayed
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>year</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-[200px] justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? years.find(
                                                                    (year) => year.value === field.value
                                                                )?.label
                                                                : "Select year"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search year..." />
                                                        <CommandList>
                                                            <CommandEmpty>No year found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {years.map((year) => (
                                                                    <CommandItem
                                                                        value={year.label}
                                                                        key={year.value}
                                                                        onSelect={() => {
                                                                            form.setValue("year", year.value)
                                                                        }}
                                                                    >
                                                                        {year.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                year.value === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                This is the language that will be used in the dashboard.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" variant="destructive" className="w-full mt-5 bg-red-500">
                                    See month
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className= "flex flex-col">
                    <h1 className="text-2xl font-bold flex items-center">
                        See monthly stats :
                    </h1>
                    <div className="flex flex-col mt-2 gap-2">
                        <p>Monthly Expend : ${data ? data.monthlyExpend : 0}</p>
                        <p>Biggest Expend : ${data ? data.biggestExpend : 0}</p>
                        <p>Smallest Expend : ${data ? data.smallestExpend : 0}</p>
                        <p>Big Purchase {data ? data.bigPurchasesCountMonth : 0}</p>
                        <p>Fixed Costs : {data ? data.fixedCostsCountMonth : 0}</p>
                        <p>Flexible Costs :{data ? data.flexibleCostsCountMonth : 0}</p>
                    </div>
                </div>
                <div className="flex flex-col w-2/6">
                    <PieChart
                        colors={['#006904', '#013C5E', '#560d0d']}
                        series={[
                            {
                                data: [
                                    {id: 0, value: data ? data.fixedCostsCountMonth : 0, label: `Fixed Costs`},
                                    {id: 1, value: data ? data.flexibleCostsCountMonth : 0, label: 'Flexible Costs'},
                                    {id: 2, value: data ? data.bigPurchasesCountMonth : 0, label: 'Big Purchase'},
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                        slotProps={{
                            legend: {
                                labelStyle: {
                                    fill: 'white',
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col p-5 bg-[#191917] rounded-3xl mt-8">
                <div className="flex flex-row">
                    <div className="space-y-3 mt-4">
                        <p className = "text-2xl">Monthly Report</p>
                        <BarChart
                            sx={(theme) => ({
                                [`.${barElementClasses.root}`]: {
                                    strokeWidth: 2,
                                },
                                [`.MuiBarElement-series-l_id`]: {
                                    stroke: "black",
                                },
                                [`.MuiBarElement-series-r_id`]: {
                                    stroke: "black",
                                },
                                [`.MuiBarElement-series-g_id`]: {
                                    stroke: "black",
                                },
                                [`.${axisClasses.root}`]: {
                                    [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                                        stroke: 'black',
                                        strokeWidth: 3,
                                    },
                                    [`.${axisClasses.tickLabel}`]: {
                                        fill: 'white',
                                    },
                                },
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                backgroundImage:
                                    'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                                backgroundSize: '35px 35px',
                                backgroundPosition: '20px 20px, 20px 20px',
                                ...theme.applyStyles('dark', {
                                    borderColor: 'rgba(255,255,255, 0.1)',
                                    backgroundImage:
                                        'linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
                                }),
                            })}
                            xAxis={[{scaleType: 'band', data: ['Selected Month']}]}
                            series={[{data: [data ? data.fixedCostsCountMonth : 0], label : "Fixed Costs", id: 'l_id'}, {data: [data ? data.flexibleCostsCountMonth : 0], label :'Flexible Costs', id: 'r_id'}, {data: [data ? data.bigPurchasesCountMonth : 0], label : "Big Purchase", id : "g_id"}]}
                            width={500}
                            colors={colors}
                            height={300}
                            slotProps={{
                                legend: {
                                    labelStyle: {
                                        fill: 'white',
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="space-y-3 mt-4">
                        <p className = "text-2xl">Daily Report</p>
                        <BarChart
                            sx={(theme) => ({
                                [`.${barElementClasses.root}`]: {
                                    strokeWidth: 2,
                                },
                                [`.MuiBarElement-series-l_id`]: {
                                    stroke: "red",

                                },
                                [`.MuiBarElement-series-r_id`]: {
                                    stroke: "red",

                                },
                                [`.MuiBarElement-series-a_id`]: {
                                    stroke: "red",

                                },
                                [`.MuiBarElement-series-s_id`]: {
                                    stroke: "red",

                                },
                                [`.MuiBarElement-series-d_id`]: {
                                    stroke: "red",

                                },
                                [`.MuiBarElement-series-f_id`]: {
                                    stroke: "red",

                                },
                                [`.MuiBarElement-series-g_id`]: {
                                    stroke: "red",

                                },
                                [`.MuiBarElement-series-h_id`]: {
                                    stroke: "red",

                                },
                                [`.${axisClasses.root}`]: {
                                    [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                                        stroke: 'black',
                                        strokeWidth: 3,
                                    },
                                    [`.${axisClasses.tickLabel}`]: {
                                        fill: 'white',
                                    },
                                },
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                backgroundImage:
                                    'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                                backgroundSize: '35px 35px',
                                backgroundPosition: '20px 20px, 20px 20px',
                                ...theme.applyStyles('dark', {
                                    borderColor: 'rgba(255,255,255, 0.1)',
                                    backgroundImage:
                                        'linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
                                }),
                            })}
                            xAxis={[{scaleType: 'band', data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']}]}
                            series={seriesData}
                            colors={colors2}
                            width={700}
                            height={300}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}