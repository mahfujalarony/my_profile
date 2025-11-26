"use client";

import React, { useState, useEffect } from "react";
import AddPost from "../Components/CreatePost";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DeletePost } from "../Components/DeletePost";
import { EditProfile } from "../Components/EditProfile";
import { Input } from "@/components/ui/input";
import Visitors from "../Components/Visitors";

const Edit = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check if already logged in
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_token", data.token);
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_token");
  };

  // Loading
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // Not authenticated - Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border">
          <h1 className="text-2xl font-bold text-center mb-6">🔒 Admin Login</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated - Main content
  return (
    <div className="p-4 w-full lg:w-xl mx-auto">
      {/* Logout Button */}
      <div className="flex  mb-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="text-red-500"
        >
          Logout
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex w-full  flex-col gap-6">
        <Tabs defaultValue="create">
          <TabsList>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            <TabsTrigger value="delete">Delete</TabsTrigger>
            <TabsTrigger value="visitors">Visitiors</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <AddPost />
          </TabsContent>
          <TabsContent value="edit">
            <EditProfile />
          </TabsContent>

          <TabsContent value="delete">
            <DeletePost />
          </TabsContent>

          <TabsContent value="visitors">
            <Visitors />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Edit;