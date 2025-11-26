"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormValue = {
  title: string;
  description: string;
  image: FileList;
  rank: number;
};

export default function AddPost() {
  const { register, handleSubmit, reset } = useForm<FormValue>();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

 
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.url; // Azure থেকে পাওয়া URL
  };

  const onSubmit = async (data: FormValue) => {
    setIsLoading(true);
    setMessage("");

    try {
      let imageUrl = "";

      
      if (data.image && data.image.length > 0) {
        setMessage("Uploading image...");
        imageUrl = await uploadImage(data.image[0]);
        console.log("Image uploaded:", imageUrl);
      }


      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          rank: data.rank,
          image: imageUrl, 
        }),
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      const responseData = await res.json();
      console.log("Response data:", responseData);

      if (res.ok) {
        setMessage("Post uploaded successfully!");
        setIsSuccess(true);
        reset();
      } else {
        setMessage(responseData.error || "Something went wrong");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Failed to upload post");
      setIsSuccess(false);
      console.error(error);
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
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter post description"
                rows={4}
                required
              />
            </div>

            {/* Rank */}
            <div className="space-y-2">
              <Label htmlFor="rank">Rank</Label>
              <Input
                id="rank"
                {...register("rank", { valueAsNumber: true })}
                type="number"
                placeholder="Enter rank"
                required
              />
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                {...register("image")}
                type="file"
                accept="image/*"
                className="cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload Post"}
            </Button>
          </form>

          {/* Message Alert */}
          {message && (
            <Alert className={`mt-4 ${isSuccess ? "border-green-500" : "border-red-500"}`}>
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