"use client";

import React from 'react'
import { useState } from 'react';
import PageTemplate from '../../templates/PageTemplate'
import Input from '@/components/input/input';
import Button from '@/components/button';
import Image from "next/image";
import PopupOverlay from "@/components/popup/popup"; 


export default function ParkingSpaces() {
const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ date: "", time: "", timeEnd: "", vehicle: "" });

const inputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${year}/${month}/${day}`;
};

const formatTime24 = (timeString: string): string => {
  if (!timeString) return "";
  
  const [h, m] = timeString.split(":");
  const hh = h.padStart(2, "0");
  const mm = m.padStart(2, "0");
  return `${hh}:${mm}`;
};

const submitRes = (e: React.FormEvent) => {
  e.preventDefault();

  const formattedDate = formatDate(form.date); 
  const startTime24 = formatTime24(form.time);
  const endTime24 = formatTime24(form.timeEnd);

  const reservationData = {
    date: formattedDate,
    time: startTime24,
    timeEnd: endTime24,
    vehicle: form.vehicle,
  };

  

  alert("Reservation sent");
  setOpen(false);
  setForm({ date: "", time: "", timeEnd: "", vehicle: "" });
};
const getDuration = () => {
  if (!form.time || !form.timeEnd) return "0h";
  const [startH, startM] = form.time.split(":").map(Number);
  const [endH, endM] = form.timeEnd.split(":").map(Number);

  const start = startH * 60 + startM;
  const end = endH * 60 + endM;
  const diff = end - start;
  if (diff <= 0) return "0h";

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
};
    return(
<PageTemplate>

  <div className='w-[85%] ml-[10%] mr-[10%] h-[15%] mt-4 flex flex-row gap-4'>
    <div className="flex flex-col w-[60%]">
      <p className='text-left text-[#ffffff] text-xs mb-1'>Destination</p>
      <Input
        className='bg-[#333446] rounded-xl h-[50%] w-[100%]'
        type="text"
        name="destination"
      />
    </div>

    <div className="flex flex-col w-[20%]">
      <p className='text-left text-[#ffffff] text-xs mb-1'>Check-in</p>
      <Input
        className='bg-[#333446] rounded-xl h-[50%] w-[100%]'
        type="date"
        name="check-in"
      />
    </div>

    <div className="flex flex-col w-[20%]">
      <p className='text-left text-[#ffffff] text-xs mb-1'>Check-out</p>
      <Input
        className='bg-[#333446] rounded-xl h-[50%] w-[100%]'
        type="date"
        name="check-out"
      />
    </div>
  </div>


  <div className="flex flex-row w-[85%] ml-[10%] gap-4  mb-10">

<div className="flex flex-col justify-center w-[35%] text-left text-white gap-4">
  <input
    type="text"
    value="Chosen space:"
    disabled
    className="w-[100%] h-[15%] pt-1 bg-[#333446] rounded-xl shadow-lg text-white text-left px-3"
  />
  <input
    type="text"
    value="Details:"
    disabled
    className="w-[100%] h-[50%] pt-1 bg-[#333446] rounded-xl shadow-lg text-white text-left px-3"
  />

      <Button
        customWidth='100%'
        type='button'
        value='Create Reservation'
        hoverEffect={true}
          onClick={() => setOpen(true)}
      />
    </div>


    <div className="flex flex-col justify-center w-[65%]">
      <Image
        src="/2floor.png"
        alt="2nd floor"
        width={600}  
        height={600} 
        style={{ width: '83%', height: '83%', borderRadius: '0.75rem'}}
      />
    </div>
  </div>
    <PopupOverlay
        open={open}
        onOpenChange={setOpen}
        title="Parking Spot Reservation Details"
        description="Selected Spot: P-103, Szczecin"
        actions={null}
        boxClassName="bg-base-200"
      >
        <form onSubmit={submitRes} className="space-y-3 ">
          <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">Select Date</h4>
          <Input
            name="date"
            type="date"
            placeholder="date"
            value={form.date}
            onChange={inputChange}
            className=" w-full bg-base-100"
            required
          />
          <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">Select Time</h4>
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
          <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">Select Vehicle</h4>
          <select
            name="vehicle"
            value={form.vehicle}
            onChange={inputChange}
            className="w-full bg-base-100 input input-bordered"
            required
          >
            <option value="">Select vehicle</option>
            <option value="car">audi</option>
            <option value="motorcycle">mercedes</option>
            <option value="van">ford</option>
          </select>
<h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">
                Reservation Duration
              </h4>
              <div className="p-5 flex items-center justify-between bg-base-100  rounded-[0.5rem]">
  <p className="text-base-content">Total time :</p>
  <span className="text-green-500 text-2xl font-bold">{getDuration()}</span>
</div>
          <div className='flex justify-end gap-40'>
             <input type='button' value='Cancel'  className='w-30 flex justify-start border-[2px] border-green-800 rounded-[1rem] h-9 ' onClick={() => setOpen(false)} />

         <Button
     className=''
        type='submit'
        value='Create Reservation'
        hoverEffect={true}
          onClick={() => setOpen(true)}
      />
    </div>

       
        </form>
    
    {/*  Sprawdzenie zapisanej daty i czasu
       
         <p>Wysłana data: {formatDate(form.date)}</p>
         <p>Start time: {formatTime24(form.time)}</p>
         <p>End time: {formatTime24(form.timeEnd)}</p>

    */} 
    
      </PopupOverlay>
</PageTemplate>

    );
};