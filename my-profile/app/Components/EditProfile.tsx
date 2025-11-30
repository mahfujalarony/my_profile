"use client";
import React, { useEffect, useState, useRef } from "react";
import  { ProfileBak }  from "@/app/types/profileType";  
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "./ui/loader";

export const EditProfile = () => {
  const [profile, setProfile] = useState<ProfileBak | null>(null);  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileimage, setProfileimage] = useState("");
  const [blobName, setBlobName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/editprofile");
        const data = await res.json();

        if (data && data._id) {
          setProfile(data);
          setName(data.name || "");
          setBio(data.bio || "");
          setProfileimage(data.profileimage || "");
          setBlobName(data.blobName || "");
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Only JPG, PNG, GIF, WEBP images allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setProfileimage(data.url);
        setBlobName(data.blobName);
        setMessage("Image uploaded successfully!");
      } else {
        setMessage(`Upload failed: ${data.message || data.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Problem uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const method = profile ? "PUT" : "POST";
      
      const bodyData = profile 
        ? { id: profile._id, name, bio, profileimage, blobName }
        : { name, bio, profileimage, blobName };

      const res = await fetch("/api/editprofile", {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const updatedData = await res.json();

      if (res.ok) {
        setProfile(updatedData);
        setMessage("Profile saved successfully!");
      } else {
        setMessage(`Failed: ${updatedData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

const handleRemoveImage = async () => {
  try {
    if (blobName) {
      const res = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blobName: blobName }),
      });

      if (! res.ok) {
        console.error("Failed to delete from Azure");
      }
    }
    setProfileimage("");
    setBlobName("");
    setMessage("Image removed successfully!");

  } catch (error) {
    console.error("Error removing image:", error);
    setMessage("Failed to remove image");
  }
};

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {profile ? "Edit Profile" : "Create Profile"}
      </h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Profile Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Profile Image</label>

          <div className="flex items-center gap-4">
            {profileimage ? (
              <img
                src={profileimage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>

              {profileimage && (
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </Button>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label className="text-xs text-gray-500">Or enter URL:</label>
            <Input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={profileimage}
              onChange={(e) => setProfileimage(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            placeholder="Write a short bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            rows={4} // Default 4 line height
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>


        {/* Message */}
        {message && (
          <p
            className={`text-sm ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={saving || uploading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {saving ? "Saving..." : profile ? "Update" : "Create"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setName(profile?.name || "");
              setBio(profile?.bio || "");
              setProfileimage(profile?.profileimage || "");
              setMessage("");
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};