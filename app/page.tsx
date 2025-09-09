"use client";
import PageTemplate from "@/templates/PageTemplate";
import Image from "next/image";
import Welcome from "@/pages/Welcome";
import Input from "@/components/input/input";
import Button from "@/components/button";
import PopupOverlay from "@/components/popup/popup";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <PageTemplate>
      <button className="btn" onClick={() => setOpen(true)}>
        Open Modal
      </button>

      <PopupOverlay
        open={open}
        onOpenChange={setOpen}
        title="My Modal"
        description="This is a test modal"
        actions={<button className="btn">OK</button>}
      >
        <p>Hello from inside!</p>
      </PopupOverlay>
    </PageTemplate>
  );
}
