"use client";

import React, { useState } from "react";
import PopupOverlay from "../popup/popup";
import Input from "../input/input";
import Button from "../button";

export default function ReportIssue() {
  const [isOpen, setIsOpen] = useState(false);
  const [issue, setIssue] = useState("");

  const handleReport = () => {
    if (!issue.trim()) {
      alert("Please describe your issue!");
      return;
    }
    console.log("Reported issue:", issue);
    setIsOpen(false);
    setIssue("");
  };

  return (
    <>
      {/* Red report button */}
      <Button
        type="button"
        value="Report Issue"
        bgColor="bg-red-600"
        textColor="text-white"
        hoverEffect
        onClick={() => setIsOpen(true)}
      />
    
      {/* Popup using PopupOverlay */}
      <PopupOverlay
        open={isOpen}
        onOpenChange={setIsOpen}
        showCloseButton
        closeOnBackdrop
        closeOnEsc
        boxClassName="bg-gray-800 h-[70%] text-white w-148 max-w-[700px] p-8"
      >
        <h1 className='text-3xl'>Report an issue</h1>
        <p className="mb-3 text-lg font-medium mt-12">Describe your issue:</p>
        <Input
          type="text"
          name="issueDescription"
          value={issue}
          onChange={(e) => {
            if (e.target.value.length <= 300) setIssue(e.target.value);
          }}
          className="w-full h-60 p-3 rounded bg-gray-700 text-white resize-none text-base"
          placeholder="Describe your issue here..."
        />
        <div className="flex justify-center mt-16">
          <Button
            type="button"
            value="Report Issue"
            bgColor="bg-red-600"
            textColor="text-white"
            customWidth="w-30"
            customHeight="h-20"
            hoverEffect
            onClick={handleReport}
          />
        </div>
      </PopupOverlay>
    </>
  );
}

