import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Posts from "@/models/Posts";

export async function GET(req: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get("sortBy");

    let sortOption: Record<string, 1 | -1>={ date: -1 }

        if (sortBy === "rank") {
            sortOption = { rank: -1 };  
        };

        if (sortBy === "date") {
            sortOption = { date: -1 };  
        };
    const post = await Posts.find().sort(sortOption);
    return NextResponse.json(post);
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const deletedPost = await Posts.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully", post: deletedPost });

  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        console.log('body is', body);
        const { title, description, image, rank } = body;

       
        if (!title || !description) {
            return NextResponse.json(
                { error: "Title and description are required" }, 
                { status: 400 }  
            );
        }

        const newPost = await Posts.create({ title, description, image, rank });
        return NextResponse.json(newPost, { status: 201 });

    } catch (err) {
        console.error("Error creating post:", err);
        
        return NextResponse.json(
            { error: "Failed to create post" }, 
            { status: 500 }                       
        );
    }
}