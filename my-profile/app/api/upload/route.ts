import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "myfiles";

export async function POST(req: NextRequest) {
  try {
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      console.error("Azure connection string is missing!");
      return NextResponse.json(
        { error: "Azure connection string not configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("File received:", file.name, file.type, file.size);

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    
    const exists = await containerClient.exists();
    if (!exists) {
      console.log("Container does not exist, creating...");
      await containerClient.create({
        access: "blob", 
      });
    }

    const extension = file.name.split(".").pop();
    const blobName = `image-${Date.now()}.${extension}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const arrayBuffer = await file.arrayBuffer();

    await blockBlobClient.uploadData(Buffer.from(arrayBuffer), {
      blobHTTPHeaders: {
        blobContentType: file.type,
      },
    });

    const fileUrl = blockBlobClient.url;
    console.log("File uploaded successfully:", fileUrl);

    return NextResponse.json({
      message: "File uploaded successfully!",
      url: fileUrl,
    });
  } catch (error: any) {
    console.error("Upload error details:", {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      stack: error.stack,
    });

    return NextResponse.json(
      { 
        error: "Upload failed", 
        message: error.message,
        code: error.code 
      },
      { status: 500 }
    );
  }
}