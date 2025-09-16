"use client";

import React, { useRef, useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import Input from "@/components/input/input";
import Button from "@/components/button";

export default function AddCar() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    plate: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] || null;
    if (f && (f.type === "image/jpeg" || f.type === "image/png")) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    if (!file) return;
    // TODO: upload logic
    alert("Photo uploaded!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: add car logic
    alert("Car added!");
  };

  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px-80px)]">
        <form
          className="w-[30%] bg-base-200 rounded-xl shadow-lg p-8 flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-center text-base-content mb-2">Add a Car</h2>
          <div className="flex flex-col gap-1">
            <label className="text-base-content font-semibold">Brand</label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="text"
              name="brand"
              placeholder="Brand"
              value={form.brand}
              onChange={inputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-base-content font-semibold">Model</label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="text"
              name="model"
              placeholder="Model"
              value={form.model}
              onChange={inputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-base-content font-semibold">Year</label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="number"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={inputChange}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-base-content font-semibold">Color</label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="text"
              name="color"
              placeholder="Color"
              value={form.color}
              onChange={inputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-base-content font-semibold">License Plate Number</label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="text"
              name="plate"
              placeholder="License Plate Number"
              value={form.plate}
              onChange={inputChange}
              required
            />
          </div>

          <div
            className="flex flex-col items-center gap-2 border-2 border-dashed border-[#7F8CAA] rounded-xl bg-primary py-6 px-4 mt-2 mb-2 cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />
            {preview ? (
              <img
                src={preview}
                alt="Car preview"
                className="w-40 h-28 object-cover rounded-lg border border-[#7F8CAA]"
              />
            ) : (
              <span className="text-base-content text-center">
                Drag & drop a car photo (JPG/PNG) here or click to select
              </span>
            )}
            <Button
              type="button"
              value="Upload Photo"
              customWidth="60%"
              hoverEffect={true}
              onClick={handleUpload}
            />
          </div>

          <Button
            value="Add a Car"
            type="submit"
            customWidth="100%"
            hoverEffect={true}
          />
        </form>
      </div>
    </PageTemplate>
  );
}
