"use client"

import React from 'react'
import { Separator } from '../ui/separator'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import ImageUpload from '../cusctom ui/ImageUpload'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Router } from 'next/router'

const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string()
})

const CollectionForm = () => {
    const router =  useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div className="p-10">
            <p className="text-heading2-bold">Создать категорию</p>
            <Separator className="bg-grey-1 mt-4 mb-7" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Название</FormLabel>
                                <FormControl>
                                    <Input placeholder="Название" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Описание</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Описание" {...field} rows={5} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Изображение</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                        value={field.value ? [field.value] : []} 
                                        onChange={(url) => field.onChange(url)} 
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">Включить</Button>
                        <Button type="button" onClick={() => router.push("/collections")} className="bg-blue-1 text-white">Отключить</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CollectionForm