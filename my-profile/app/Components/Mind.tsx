"use client";
import React, { useEffect, useState } from "react";
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

const demo: postData[] = [
  {
    _id: "1",
    title: "First Post",
    date: new Date("2024-12-05"),
    view: 5,
    image: "/a.jpg",
    description: "This is the first demo post",
    rank: 1,
  },
  {
    _id: "2",
    title: "Second Post",
    date: new Date("2023-06-02"),
    view: 3,
    image: "/b.jpg",
    description: "This is the second demo post",
    rank: 5,
  },
  {
    _id: "3",
    title: "Third Post",
    date: new Date(),
    view: 10,
    image: "/a.jpg",
    description: "This is the third demo post",
    rank: 3,
  },
];

export const Mind = () => {
  const [mind, setMind] = useState<postData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date");


  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts?sortBy=${sortBy}`);
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
  {new Date(item.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })} 
  {' '}
  {new Date(item.date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })}
</p>

          <p>
            {timeAgo(new Date(item.date))}
          </p>
          </div>

          <h2 className="text-xl font-semibold mt-5">{item.title}</h2>
          <p className="mt-2">{item.description}</p>

          {item.image? 
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto object-cover rounded mt-2"
          /> : ''
        }



        </div>
      ))}
    </div>
  );
};
