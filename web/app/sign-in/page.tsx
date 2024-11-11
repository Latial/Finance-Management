"use client"

import React from "react";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {useAuthorizeMutation} from "@/lib/redux/api/api";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod"
import NavBar from "@/components/header/NavBar";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input"
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import config from "@/lib/config";

const formVal = z.object ({
    email : z.string().email("Wrong email address or account doesn't exist"),
    password : z.string().min(7,"Minimum number of characters is 7")
})

export default function SingIn() {
    const [authorize, authorizeResult] = useAuthorizeMutation()
    const router = useRouter();

    const form = useForm<z.infer<typeof formVal>>({
        resolver: zodResolver(formVal),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const queryParameters = new URLSearchParams(window.location.search)
    const activated = queryParameters.get("activated")

    async function onSubmit(values: z.infer<typeof formVal>) {
        if (activated === "true" || activated === null) {
            const result = await authorize({
                authenticationRequest: {
                    email: values.email,
                    password: values.password,
                }
            })

            if ("data" in result && result.data?.token) {
                localStorage.setItem(config.LOCAL_STORAGE_TOKEN_KEY, result.data.token)
                router.push("/")
            }
        } else {
            return
        }
    }


    if (authorizeResult.isSuccess) {
        window.location.replace("/");
    }

    function checkLogin() {
        const userJson = localStorage.getItem(config.LOCAL_STORAGE_TOKEN_KEY);
        if (activated === "true") {
            return <p>Account activated, you may log in</p>
        } else if (activated === "false") {
            return <p>Please activate your account</p>
        } else {
            return <p></p>
        }
    }

    window.addEventListener('load', checkLogin);

    return <main className="flex justify-center items-center flex-col">
        <div className= "mx-auto py-10 flex">
            <Card className="p-10 w-96 border-none relative">
                <h1 className="text-3xl font-bold mb-5">Prijavi se</h1>

                <Form {...form}>
                    {authorizeResult.isError &&
                        <div className="text-destructive text-center mb-5">
                            Wrong email or password
                        </div>}

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email adresa</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
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
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Lozinka</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <div className="h-6">
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />


                        <Button type="submit" className="w-full mt-5 bg-red-500">Log In</Button>

                        {/*Forgot password*/}
                        <div className="mt-5">
                            <Link href="/forgot-password"
                                  className="hover:border-b-primary border-b border-b-transparent">
                                Forgot password?
                            </Link>
                        </div>

                    </form>
                </Form>
            </Card>
        </div>
    </main>
}