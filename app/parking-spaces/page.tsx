"use client";

import React from 'react'
import { useState } from 'react';
import PageTemplate from '../../templates/PageTemplate'
import Input from '@/components/input/input';
import Button from '@/components/button';
import Image from "next/image";

export default function ParkingSpaces() {

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
</PageTemplate>

    );
};