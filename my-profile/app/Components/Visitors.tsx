"use client";

import { useEffect, useState } from "react";
import { timeAgo } from "../utils/timeAgo";
import Loader from "./ui/loader";
import { getDeviceName } from "../utils/deviceDetector";
import { Button } from "@/components/ui/button";

interface Visitor {
  _id: string;
  ip: string;
  userAgent: string;
  referer: string;
  language?: string;
  count?:number;
  device?: string;
  timezone?: string;
  visitedAt: string;
}

export default function Visitors() {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshs, setRefreshs] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');


  const fetchVisitors = async ( isRefresh = false ) => {
    try {

      if(isRefresh) {
        setRefreshs(true);
      } else {
        setLoading(true);
      }
      setLoading(true);
      const res = await fetch("/api/track");
      const data = await res.json();
      setTotalVisits(data.total);
      setVisitors(data.lastVisitors);
    } catch (e) {
      console.error("Error fetching visitors", e);
    } finally {
      setLoading(false);
      setRefreshs(false);
    }
  };
  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleRefresh = () => {
    fetchVisitors(true);
  }

  const handleDelete = async (_id: string) => {

    try {
      setDeleting(_id);

      const res = await fetch(`/api/track/${_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVisitors((prev) => prev.filter((v) => v._id !== _id));
        setTotalVisits((prev) => (prev ? prev - 1 : 0));
      } else {
        const data = await res.json();
        setMessage(data.message || "Delete failed!");
      }
    } catch (e) {
      console.error("Error deleting visitor", e);
      setMessage("Delete problem!");
    } finally {
      setDeleting(null);
    }
  };


  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen  flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Visitor Analytics</h1>

      <Button variant={"outline"} onClick={handleRefresh} className="mt-2 mb-3 cursor-pointer">refresh</Button>
      <div className="mb-8 p-4 rounded-lg shadow-lg">
        <p className="text-lg">
          Total Visite:{" "}
          <span className="font-semibold text-emerald-400">
            {totalVisits ?? 0}
          </span>
        </p>
      </div>

      <div className="w-full max-w-4xl  rounded-lg shadow-lg p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-3">New Visite</h2>
        {visitors.length === 0 ? (
          <p className="text-slate-400">No Visitor Found ।</p>
        ) : (
          <table className="w-full text-sm border border-slate-800 rounded-lg overflow-hidden">
            <thead className="bg-slate-900/40 text-slate-300">
              <tr>
                <th className="text-left py-3 px-3">Count</th>
                <th className="text-left py-3 px-3">time</th>
                <th className="text-left py-3 px-3">Ago</th>
                <th className="text-left py-3 px-3">IP</th>
                <th className="text-left py-3 px-3">Device</th>
                <th className="text-left py-3 px-3">Language</th>
                <th className="text-left py-3 px-3">Timezone</th>
                <th className="text-left py-3 px-3">Referrer</th>
                <th className="text-left py-3 px-3">Visited At</th>
                <th>Delete</th>
              </tr>
            </thead>

              <tbody>
                {visitors.map((v, i) => (
                  <tr
                    key={v._id}
                    className={`border-t border-slate-800 ${
                      i % 2 === 0 ? "bg-slate-900/20" : "bg-slate-900/10"
                    } hover:bg-slate-800/30 transition`}
                  >
               
                    <td className="py-2 px-3 font-semibold">{i + 1}</td>

                    <td className="py-2 px-3">
                      {v.count}
                    </td>
                    <td className="py-2 px-3">
                      {timeAgo(new Date(v.visitedAt))}
                    </td>
                    <td className="py-2 px-3">{v.ip}</td>
                    <td className="py-2 px-3">{v.device || "unknown"}</td>
                    <td className="py-2 px-3">{v.language || "-"}</td>
                    <td className="py-2 px-3">{v.timezone || "-"}</td>
                    <td className="py-2 px-3 max-w-[180px] truncate">
                      {v.referer || "-"}
                    </td>
                    <td className="py-2 px-3">
                      {new Date(v.visitedAt).toLocaleString()}
                    </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => handleDelete(v._id)}
                      disabled={deleting === v._id}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 
                                 text-white rounded text-xs font-medium transition-colors
                                 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {deleting === v._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                  </tr>
                ))}
              </tbody>

          </table>

        )}
      </div>
    </div>
  );
}