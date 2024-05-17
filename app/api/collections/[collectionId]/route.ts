import Collection from "@/lib/models/Collection";
import { connectionToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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
        return new NextResponse("Internal error", {status:500})
    }
}