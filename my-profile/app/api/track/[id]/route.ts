import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import VisitorModel from "@/models/Visitor";

// DELETE - একটি visitor delete করা
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const deleted = await VisitorModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Visitor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Visitor deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}