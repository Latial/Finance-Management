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

const formSchema = z.object ({
    month: z.string({
        required_error: "Please select a language.",
    }),
})
export default function ShowStatsMonth() {
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
                    month : values.month
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


    return (
        <>
            <div>
                <h1 className="text-2xl font-bold flex items-center mb-10">
                    AddExpanse
                </h1>
                <div className="flex flex-col">
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
                                                            <CommandGroup>
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
                                                This is the language that will be used in the dashboard.
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" variant="destructive" className="w-full mt-5 bg-red-500">
                                    See month
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div className= "flex flex-col mt-2 gap-2">
                        <p>Monthly Expend : ${data ? data.monthlyExpend : 0}</p>
                        <p>Biggest Expend : ${data ? data.biggestExpend : 0}</p>
                        <p>Smallest Expend : ${data ? data.smallestExpend : 0}</p>
                        <p>Big Purchase ${data ? data.bigPurchasesCount : 0}</p>
                        <p>Fixed Costs : {data ? data.fixedCostCount : 0}</p>
                        <p>Flexible Costs :{data ? data.flexibleCostsCount : 0}</p>
                    </div>
                </div>
            </div>
        </>
    )
}