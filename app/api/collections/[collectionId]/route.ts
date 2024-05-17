import Collection from "@/lib/models/Collection";
import { connectionToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET =async (req: NextRequest, {params} : {params: {collectionId:string}}) =>{
    try{
        await connectionToDB()

        const collection = await Collection.findById(params.collectionId)

        if(!collection){
            return new NextResponse(JSON.stringify({message:"Категория не найдена"}), {status:404})
        }

        return NextResponse.json(collection, {status:200})

    } catch (err){
        console.log("[collectionId_GET]",err)
        return new NextResponse("Внутренняя ошибка", {status:500})
    }
}

export const POST = async (req: NextRequest, {params} : {params: {collectionId:string}}) =>{
    try{
        const {userId} = auth()

        if(!userId){
            return new NextResponse("Неавторизованный", {status:401})
        }

        await connectionToDB()

        let collection = await Collection.findById(params.collectionId)

        if(!collection){
            return new NextResponse("Категория не найдена", {status:404})
        }

        const {title, description, image} = await req.json()

        if (!title || !image){
            return new NextResponse("Название и изображение обязательны", {status:400})
        }

        collection = await Collection.findByIdAndUpdate(params.collectionId, {title, description, image}, {new:true})

        await collection.save()

        return NextResponse.json(collection, {status:200})

    } catch(err){
        console.log("[collectionId_POST]",err)
        return new NextResponse("Внутренняя ошибка", {status:500})
    }

};

export const DELETE = async (req: NextRequest, {params} : {params: {collectionId: string}}) => {
    try {
        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        await connectionToDB()

        await Collection.findByIdAndDelete(params.collectionId)
        return new NextResponse( "Категория удалена", {status:200})
    } catch (err){
        console.log("[collectionId_DELETE]", err)
        return new NextResponse("Внутренняя ошибка", {status:500})
    }
}