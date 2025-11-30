import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env. AZURE_STORAGE_CONNECTION_STRING;
const containerName = "myfiles";


const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];


const MAX_IMAGE_SIZE = 10 * 1024 * 1024;  
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; 

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

export async function DELETE(req: NextRequest) {
  try {
    const { blobName } = await req.json();

    if (!blobName) {
      return NextResponse.json(
        { error: "blobName is required" },
        { status: 400 }
      );
    }

    const success = await deleteBlob(blobName);

    if (success) {
      return NextResponse.json({  
        message: "File deleted successfully! ",
      });
    } else {
      return NextResponse.json( 
        { error: "Failed to delete file" },
        { status: 500 }
      );
    }

  } catch (err) {
    console.log("blob delete error", err);
    return NextResponse.json(  
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      console.error("Azure connection string is missing!");
      return NextResponse.json(
        { error: "Azure connection string not configured" },
        { status: 500 }
      );
    }

    const formData = await req. formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("File received:", file.name, file.type, file.size);


    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse. json(
        { error: `File type not allowed.  Allowed: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      );
    }


    const isVideo = file.type.startsWith("video/");
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      return NextResponse.json(
        { error: `File too large. Max ${maxSizeMB}MB allowed for ${isVideo ? "videos" : "images"}.` },
        { status: 400 }
      );
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const exists = await containerClient.exists();
    if (!exists) {
      console.log("Container does not exist, creating...");
      await containerClient.create({
        access: "blob",
      });
    }

   
    const extension = file.name.split("."). pop();
    const prefix = isVideo ? "video" : "image";
    const blobName = `${prefix}-${Date.now()}.${extension}`;
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
      blobName: blobName,
      mediaType: isVideo ? "video" : "image",  
    });
  } catch (error: any) {
    console. error("Upload error details:", {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: "Upload failed",
        message: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}


