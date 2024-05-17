import Collection from "@/lib/models/Collection"
import { connectionToDB } from "@/lib/mongoDB"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const {userId} = auth()
        
        if (!userId){
            return new NextResponse("Unauthorized", {status:403})
        }
        await connectionToDB()

        const {title, description, image} = await req.json()

        const existingCollection =  await Collection.findOne({title})

        if(existingCollection){
            return new NextResponse("Категория уже существует", {status: 400})
        }

        if (!title || !image){
            return new NextResponse("Название и изображения обязательны", {status:400})
        }

        const newCollection = await Collection.create({
            title,
            description,
            image
        })

        await newCollection.save()

        return NextResponse.json(newCollection, {status:200})


    } catch (err){
        console.log("[collections_POST]", err)
        return new NextResponse("Interval Server Error", {status:500})
    }
}