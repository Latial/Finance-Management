"use client"

import React from "react";
import {Card} from "@/components/ui/card";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import Link from "next/link";
import {useAuthorizeMutation, useRegisterMutation} from "@/lib/redux/api/api";
import config from "@/lib/config";
import {useRouter} from "next/navigation";
import {Checkbox} from "@/components/ui/checkbox";
import {toast} from "sonner";
import NavBar from "@/components/header/NavBar";

const formSchema = z.object({
    email: z
        .string()
        .email("Enter a valid email")
        .min(5, "Email must have at least 5 chracters")
        .max(254, "Max character is 254"),

    password: z.string()
        .min(5, "Password can't be shorter that 7 characters")
        .max(60, "Password can't be longer then 60 characters"),
    firstName: z.string()
        .min(1, "First Name is required")
        .max(50, "Name can have max 40 characters"),

    lastName: z.string()
        .min(1, "Last name is required")
        .max(50, "Surname can have at least 40 characters"),

    passwordConfirmation: z.string()
        .min(5, "Password can't be shorter then 7 characters"),

})
    .refine(data => data.password === data.passwordConfirmation, {
            message: "Password don't match",
            path: ["passwordConfirmation"]
        }
    )

export default function SignUpForm() {

    const [register, registerResult] = useRegisterMutation()
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            passwordConfirmation: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await register({
            registerUserRequest: {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
            }
        })

        if ("data" in result && result.data.token) {
            toast.success("Registration Successful", {
                description: "Welcome",
            })
        }
    }

    if (registerResult.isSuccess) {
        router.replace("/sign-in")
    }


    return <>
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-sm text-muted-foreground mb-5">
            Sign Up to keep track of you spending
        </p>


        <Form {...form}>
            {registerResult.isError &&
                <div className="text-destructive text-center mb-5">
                    Registration failed
                </div>}

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem className={"lg:w-1/2 w-full"}>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="First Name"
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
                        name="lastName"
                        render={({field}) => (
                            <FormItem className={"lg:w-1/2 w-full"}>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Last Name"
                                        {...field}
                                    />
                                </FormControl>
                                <div className="h-6">
                                    <FormMessage/>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>



                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <div className="h-6">
                                <FormMessage/>
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Repeat Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Repeat Password" {...field} />
                            </FormControl>
                            <div className="h-6">
                                <FormMessage/>
                            </div>
                        </FormItem>
                    )}
                />




                <Button type="submit" variant= "destructive" className="w-full mt-5 bg-red-500">
                    Sign Up
                </Button>


                {/*Forgot password*/}
                <div className="mt-5">
                    <Link href="/sign-in"
                          className="hover:border-b-primary border-b border-b-transparent">
                        Already have an account, Sign in instead
                    </Link>
                </div>

            </form>
        </Form>
    </>
}