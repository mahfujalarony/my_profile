"use client";
import React, { useEffect, useState, useRef } from "react";
import { postData } from "../types/postType";
import { timeAgo } from "../utils/timeAgo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "./ui/loader";
import { Button } from "@/components/ui/button";

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (! video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry. isIntersecting) {
            video.play(). catch(() => {});
          } else {
       
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, 
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className="w-full h-auto max-h-[70vh] object-contain"
      muted
      controls
      loop
      playsInline
      preload="metadata"
    />
  );
};

export const DeletePost = () => {
  const [mind, setMind] = useState<postData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts? sortBy=${sortBy}`);
        const data = await res. json();
        console.log("data", data);
        setMind(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [sortBy]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/posts?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMind((prev) => prev.filter((item) => item._id !== id));
        console.log("Post deleted successfully");
      } else {
        const errorData = await res.json();
        console.error("Delete failed:", errorData. error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Mind Preview</h1>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="rank">Rank</SelectItem>
        </SelectContent>
      </Select>

      {mind.map((item) => (
        <div
          key={item._id}
          className="border border-blue-500 p-4 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between">
            <p className="text-gray-500 text-sm">
            
              {item.date
                ? new Date(item.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "No date"}{" "}
              {item.date
                ? new Date(item.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </p>
         
            <p>{item.date ? timeAgo(new Date(item. date)) : ""}</p>
          </div>

          <h2 className="text-xl font-semibold mt-5">{item.title}</h2>
          <p className="mt-2">{item.description}</p>

          {item.image && (
            <img
              src={item.image}
              alt={item.title || "Post image"}  
              className="w-full h-auto object-cover rounded mt-2"
            />
          )}

           {item.video && (
                <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-black">
                    <VideoPlayer src={item.video} />
                  </div>
                </div>
              )}

          <Button
            variant="outline"
            className="w-full mt-5 bg-red-400 cursor-pointer hover:bg-red-500"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};