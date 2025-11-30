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

export const Mind = () => {
  const [mind, setMind] = useState<postData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts? sortBy=${sortBy}`);
        const data = await res.json();
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

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
  
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-2xl mx-auto px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold  from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mind Feed
            </h1>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px]  bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 rounded-full shadow-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="date">📅 Date</SelectItem>
                <SelectItem value="rank">⭐ Rank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6">
        {mind.length === 0 ?  (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-500 dark:text-slate-400">No posts yet</p>
          </div>
        ) : (
          mind.map((item) => (
            <article
              key={item._id}
              className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700"
            >
         
              <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2. 5 py-1 rounded-full">
                      📅
                      <span>
                        {item.date
                          ? new Date(item.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "No date"}
                      </span>
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2. 5 py-1 rounded-full">
                      🕐
                      <span>
                        {item.date &&
                          new Date(item.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </span>
                    </span>
                  </div>
                  <span className="text-blue-500 dark:text-blue-400 font-medium">
                    {item.date ? timeAgo(new Date(item.date)) : ""}
                  </span>
                </div>
              </div>

     
              <div className="px-4 py-3 sm:px-5 sm:py-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item. description}
                </p>
              </div>

          
              {item.image && (
                <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title || "Post image"}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              
              {item.video && (
                <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-black">
                    <VideoPlayer src={item.video} />
                  </div>
                </div>
              )}

              {/* Post Footer */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <button className="flex items-center gap-1. 5 text-slate-500 hover:text-red-500 transition-colors text-sm">
                    <span>❤️</span>
                    <span className="hidden sm:inline">Like</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors text-sm">
                    <span>💬</span>
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center gap-1. 5 text-slate-500 hover:text-green-500 transition-colors text-sm">
                    <span>🔗</span>
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};