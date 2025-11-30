import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Posts from "@/models/Posts";
import { BlobServiceClient } from "@azure/storage-blob";


const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "myfiles";


async function deleteBlob(blobName: string): Promise<boolean> {
    try {
        if (!AZURE_STORAGE_CONNECTION_STRING || !blobName) {
            return false;
        }

        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(blobName);

        await blobClient.delete();
        console.log(` Blob deleted: ${blobName}`);
        return true;

    } catch (error) {
        console.error(` Blob delete failed: ${blobName}`, error);
        return false;
    }
}


export async function GET(req: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get("sortBy");

    let sortOption: Record<string, 1 | -1> = { date: -1 };

    if (sortBy === "rank") {
        sortOption = { rank: -1 };
    }

    if (sortBy === "date") {
        sortOption = { date: -1 };
    }

    const post = await Posts.find().sort(sortOption);
    return NextResponse.json(post);
}


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        console.log("body is", body);

    
        const { title, description, image, rank, blobName, video } = body;
        // console.log('body', title, description, blobName, image, video );

        const newPost = await Posts.create({ 
            title, 
            description, 
            image, 
            rank,
            blobName,
            video
        });

        return NextResponse.json(newPost, { status: 201 });

    } catch (err) {
        console.error("Error creating post:", err);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}


export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        console.log('id', id);

        if (!id) {
            return NextResponse. json(
                { error: "Post ID is required" },
                { status: 400 }
            );
        }

 
        const post = await Posts.findById(id);

        if (!post) {
            return NextResponse. json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

     
        if (post.blobName) {
            await deleteBlob(post.blobName);
        }

      
        await Posts.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Post deleted successfully",
            post: post,
        });

    } catch (err) {
        console.error("Error deleting post:", err);
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}