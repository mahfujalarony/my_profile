import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import mongoose from "mongoose";

// Schema define
const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: null },
  bio: { type: String, required: true },
  profileimage: { type: String, default: null },
  blobName: { type: String, default: null },
  view: { type: Number, default: 0 },
});

// Model
const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

// GET
export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne();
    return NextResponse.json(profile || {});
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, bio, profileimage, blobName } = body;

    console.log("POST - Creating new profile:", { name, bio, profileimage });

    if (!bio) {
      return NextResponse.json({ error: "Bio is required" }, { status: 400 });
    }

    const newProfile = await Profile.create({ name, bio, profileimage });
    console.log("Created:", newProfile);
    
    return NextResponse.json(newProfile, { status: 201 });
  } catch (error: any) {
    console.error("POST Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, name, bio, profileimage, blobName } = body;

    console.log("PUT - Updating profile:", { id, name, bio, profileimage, blobName });

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { $set: { name, bio, profileimage, blobName } },
      { new: true }
    );

    console.log("Updated:", updatedProfile);

    if (!updatedProfile) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProfile);
  } catch (error: any) {
    console.error("PUT Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}