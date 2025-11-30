"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormValue = {
  title?: string;
  description?: string;
  media?: FileList;
  rank?: number;
};

export default function AddPost() {
  const { register, handleSubmit, reset } = useForm<FormValue>();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const uploadMedia = async (file: File): Promise<{ url: string; mediaType: string; blobName: string }> => {
    const formData = new FormData();
    formData. append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (! res. ok) {
      const error = await res.json();
      throw new Error(error.error || "Media upload failed");
    }

    const data = await res.json();
    return {
      url: data.url,
      blobName: data.blobName,
      mediaType: data. mediaType,
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target. files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      if (file.type.startsWith("video/")) {
        setMediaType("video");
      } else if (file. type.startsWith("image/")) {
        setMediaType("image");
      }
    } else {
      setPreview(null);
      setMediaType(null);
    }
  };

  const onSubmit = async (data: FormValue) => {
    setIsLoading(true);
    setMessage("");

    try {
      let mediaUrl = "";
      let uploadedMediaType = "";
      let uploadedBlobName = "";  

      if (data.media && data.media.length > 0) {
        const file = data.media[0];

        if (file.type.startsWith("video/")) {
          setMessage("Uploading video...");
        } else {
          setMessage("Uploading image...");
        }

        const uploadResult = await uploadMedia(file);
        mediaUrl = uploadResult.url;
        uploadedMediaType = uploadResult.mediaType;
        uploadedBlobName = uploadResult.blobName; 
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title || "",
          description: data.description || "",
          rank: data.rank || 0,
          image: uploadedMediaType === "image" ?  mediaUrl : "",
          video: uploadedMediaType === "video" ? mediaUrl : "",
          mediaType: uploadedMediaType || null,
          blobName: uploadedBlobName || "", 
        }),
      });

      const responseData = await res.json();

      if (res.ok) {
        setMessage("Post uploaded successfully!");
        setIsSuccess(true);
        reset();
        setPreview(null);
        setMediaType(null);
      } else {
        setMessage(responseData. error || "Something went wrong");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Failed to upload post");
      setIsSuccess(false);
      console. error(error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add New Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {... register("title")}
                placeholder="Enter post title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter post description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rank">Rank</Label>
              <Input
                id="rank"
                {... register("rank", { valueAsNumber: true })}
                type="number"
                placeholder="Enter rank"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="media">Image / Video</Label>
              <Input
                id="media"
                {... register("media")}
                type="file"
                accept="image/*,video/*"
                className="cursor-pointer"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500">
                Supported: JPG, PNG, GIF, MP4, WebM (Max: 100MB for video)
              </p>
            </div>

            {preview && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-lg p-2 bg-gray-50">
                  {mediaType === "video" ? (
                    <video
                      src={preview}
                      controls
                      className="w-full max-h-[200px] rounded"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-[200px] object-contain rounded"
                    />
                  )}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload Post"}
            </Button>
          </form>

          {message && (
            <Alert className={`mt-4 ${isSuccess ?  "border-green-500" : "border-red-500"}`}>
              <AlertDescription className={isSuccess ? "text-green-600" : "text-red-600"}>
                {message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}