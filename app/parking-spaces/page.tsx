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
  {/* Górna część - pełna szerokość */}
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

  {/* Dolna część - lewa = 2 inputy + button, prawa = obraz */}
  <div className="flex flex-row w-[85%] ml-[10%] mt-4 gap-4">
    {/* Lewa kolumna */}
    <div className="flex flex-col justify-center w-[50%] text-left text-white gap-4">
      <Input 
        className="w-[100%] h-[15%] bg-[#333446] rounded-xl shadow-lg"
        type='text'
        name='chosenSpace'
        value='Chosen space:'
        disabled
      />
      <Input 
        className="w-[100%] h-[50%] bg-[#333446] rounded-xl shadow-lg"
        type='text'
        name='details'
        disabled
      />
      <Button
        customWidth='100%'
        type='button'
        value='Create Reservation'
        hoverEffect={true}
      />
    </div>

    {/* Prawa kolumna - obraz */}
    <div className="flex flex-col justify-center w-[50%]">
      <Image
        src="/2floor.png"
        alt="2nd floor"
        width={600}  
        height={600} 
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  </div>
</PageTemplate>

    );
};