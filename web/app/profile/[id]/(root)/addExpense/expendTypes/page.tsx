"use client"

import React, {useEffect, useState} from 'react'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import fetchJson from "@/lib/fetch";
import {Checkbox} from "@/components/ui/checkbox";
import { Toast } from "@/components/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {useExpanseAloneMutation, useHistoryMutation, useStatsMutation} from "@/lib/redux/api/api";
import config from "@/lib/config";
import {jwtDecode} from "jwt-decode";
import {useJwt} from "react-jwt";
import {useParams} from "react-router";


const formSchema = z.object ({
    item: z.string()
        .min(1, "Item Name is required")
        .max(50, "Name can have max 40 characters"),
    price : z.preprocess((a) => parseInt(z.string().parse(a),10),z.number().gte(18, 'Must be 18 and above')),
    type: z.enum(["Fixed Costs", "Flexible Costs", "Big Purchases"], {
        required_error: "You need to select a type.",
    }),
})

export default function ExpendType() {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        fetch('http://localhost:8080/api/expendType')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])


    const [add, addResult] = useExpanseAloneMutation();
    const[addStat, statResult] = useStatsMutation();
    const [addHistory, addHistoryResult] = useHistoryMutation();
    const [user, setUser] = useState("default");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            item : "",
            price : 0,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const path = window.location.pathname; // "/profile/52/addExpense"
            const id = path.split('/')[2];
            const result = await add({
                expendAloneRequest: {
                    name: values.item,
                    price: values.price,
                    typeName: values.type,
                    userId : id
                }
            })
            const resultHistory = await addHistory({
                historyRequest: {
                    date : new Date(Date.now()),
                    name: values.item,
                    price: values.price,
                    typeName: values.type,
                    userId : id
                }
            })
            const resultStat = await addStat({
                statsRequest: {
                    userId : id
                }
            })
            if ("data" in result) {
                Toast({
                    title: `Item ${values.item}:`
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

    return (
        <div className="p-5 bg-[#191917] rounded-3xl">
            <h1 className="text-2xl font-bold flex items-center mb-10">
                AddExpanse
            </h1>
            <div className="prose rounded-3xl dark:prose-invert w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="item"
                            render={({field}) => (
                                <FormItem className={"w-full"}>
                                    <FormLabel>Add Item</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Add Item Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className="h-6">
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem className={"w-full"}>
                                    <FormLabel>Add Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Add price"
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className="h-6">
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Expend type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {data.map((data, index) =>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value= {data.type} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {data.type}
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="destructive" className="w-full mt-5 bg-red-500">
                            Add Expense
                        </Button>

                    </form>
                </Form>
            </div>
        </div>
    )
}