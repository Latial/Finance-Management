"use client"



import {z} from "zod";
import {Toast} from "@/components/hooks/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useExpanseAloneMutation, useExpanseRemoveMutation, useHistoryMutation} from "@/lib/redux/api/api";

const formSchema = z.object ({

})

// @ts-ignore
export default function RemoveExpend(expend) {
    const [remove, removeResult] = useExpanseRemoveMutation();
    const [addHistory, addHistoryResult] = useHistoryMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })
    console.log(expend.expend.id);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const path = window.location.pathname; // "/profile/52/addExpense"
            const id = path.split('/')[2];
            const result = await remove({
                expendRemoveRequest : {
                    expend_id : expend.expend.id,
                    user_id : id
                }
            })
            const resultHistory = await addHistory({
                historyRequest: {
                    date: new Date(Date.now()),
                    name: expend.expend.item,
                    price: expend.expend.price,
                    typeName: expend.expend.type.type,
                    userId: id,
                    status : "Removed"
                }
            })
        } catch (error) {

        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Button type="submit" variant="destructive" className="w-full bg-red-500">
                        Remove
                    </Button>

                </form>
            </Form>
        </>
    )
}