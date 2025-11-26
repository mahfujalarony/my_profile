"use client";

import { useEffect, useState } from "react";
import { timeAgo } from "../utils/timeAgo";
import Loader from "./ui/loader";
import { getDeviceName } from "../utils/deviceDetector";

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


  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/track");
        const data = await res.json();
        setTotalVisits(data.total);
        setVisitors(data.lastVisitors);
      } catch (e) {
        console.error("Error fetching visitors", e);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen  flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Visitor Analytics</h1>

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
                <th className="text-left py-3 px-3">IP</th>
                <th className="text-left py-3 px-3">Device</th>
                <th className="text-left py-3 px-3">Language</th>
                <th className="text-left py-3 px-3">Timezone</th>
                <th className="text-left py-3 px-3">Referrer</th>
                <th className="text-left py-3 px-3">Visited At</th>
                <th className="text-left py-3 px-3">Ago</th>
                <th className="text-left py-3 px-3">count</th>
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
                      {timeAgo(new Date(v.visitedAt))}
                    </td>
                    <td className="py-2 px-3">
                      {v.count}
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