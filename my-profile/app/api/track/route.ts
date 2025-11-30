import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import VisitorModel from "@/models/Visitor";

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGODB_URI);
}

export async function POST(req: NextRequest) {
  await connectDB();

  const userAgent = req.headers.get("user-agent") || "";
  const referer = req.headers.get("referer") || "";

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";


  const body = await req.json().catch(() => ({}));

  const isVisited = await VisitorModel.findOne({ ip });

  if (isVisited) {
    await VisitorModel.findOneAndUpdate(
      { ip },
      {
        count: (isVisited.count || 0) + 1,
        visitedAt: new Date(),
      }
    );

    return NextResponse.json({ updated: true });
  }

 
  await VisitorModel.create({
    ip,
    userAgent,
    referer,
    language: body.language,
    device: body.device,
    timezone: body.timezone,
    count: 1,
    visitedAt: new Date(),
  });

  return NextResponse.json({ created: true });
}

export async function GET() {
  await connectDB();

  const total = await VisitorModel.countDocuments();

  const lastVisitors = await VisitorModel.find()
    .sort({ visitedAt: -1 })
    .lean();

  return NextResponse.json({ total, lastVisitors });
}

