"use client";
import PageTemplate from "@/templates/PageTemplate";
import PopupOverlay from "@/components/popup/popup";
import Input from "@/components/input/input";
import { useState } from "react";

const PopupReservationPage = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ date: "" , time: "", timeEnd: ""});

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRes = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Reservation sent");
    setOpen(false);
    setForm({ date: "", time: "", timeEnd: "" });
  };

  return (
    <PageTemplate>
      <h1 className="mb-4">Popup Reservation</h1>
      <button className="btn btn-primary mb-4" onClick={() => setOpen(true)}>
        Reserve
      </button>
     
      <PopupOverlay
        open={open}
        onOpenChange={setOpen}
        title="Parking Spot Reservation Details"
        description="Selected Spot: P-103, Szczecin"
        actions={null}
        boxClassName="bg-base-200"
      >
        
        <form onSubmit={submitRes} className="space-y-3 ">
           <h4  className="text-base-content font-bold text-[1rem] mt-7 mb-3">Select Date</h4>
          <Input
            name="date"
            type="date"
            placeholder="date"
            value={form.date}
            onChange={inputChange}
            className=" w-full bg-base-100"
            required
          />
          <h4  className="text-base-content font-bold text-[1rem] mt-7 mb-3">Select Time</h4>
   
         <div className="flex row gap-6">
            
            <Input
            name="time"
            type="time"
            placeholder="Start Time"
            value={form.time}
            onChange={inputChange}
            className=" w-full bg-base-100"
            required
          />
          <Input
            name="timeEnd"
            type="time"
            placeholder="End Time"
            value={form.timeEnd}
            onChange={inputChange}
            className=" w-full bg-base-100"
            required
          />
         </div>
          
          <button type="submit" className="btn btn-primary w-full">
            Confirm Reservation
          </button>
        </form> 
      </PopupOverlay>
   
    </PageTemplate>
  );
};

export default PopupReservationPage;