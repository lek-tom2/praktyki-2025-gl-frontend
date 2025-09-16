"use client";
import PageTemplate from "@/templates/PageTemplate";
import Image from "next/image";
import Input from "@/components/input/input";
import Button from "@/components/button";
import { useState, useEffect } from "react";
type Vehicle = {
  registration_number: string;
  brand: string;
};
export default function Home() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
const [editIdx, setEditIdx] = useState<number | null>(null);
const [editBrand, setEditBrand] = useState("");
const [editRegNum, setEditRegNum] = useState("");
 const handleDeleteVehicle = async (registration_number: string) => {
    await fetch(`/api/vehicles/${registration_number}`, {
      method: "DELETE",
    });
   
    setVehicles((prev) => prev.filter(v => v.registration_number !== registration_number));
  };
const handleEditClick = (idx: number) => {
  setEditIdx(idx);
  setEditBrand(vehicles[idx].brand);
  setEditRegNum(vehicles[idx].registration_number);
};

const handleEditSave = async () => {
  const updatedVehicle = {
    registration_number: editRegNum,
    brand: editBrand,
  };
  await fetch(`/api/vehicles/${vehicles[editIdx!].registration_number}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedVehicle),
  });
  setVehicles((prev) =>
    prev.map((v, idx) =>
      idx === editIdx ? updatedVehicle : v
    )
  );
  setEditIdx(null);
  setEditBrand("");
  setEditRegNum("");
};

const handleEditCancel = () => {
  setEditIdx(null);
  setEditBrand("");
  setEditRegNum("");
};
 useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/vehicles");
        if (res.ok) {
          const data = await res.json();
          setVehicles(data.vehicles);
        } else {
          
          setVehicles([
           //  { registration_number: "ZS12345", brand: "Toyota Corolla" },
           //example vehicle
          ]);
        }
      } catch {
        setVehicles([
         //{ registration_number: "ZS12345", brand: "Toyota Corolla" },
          //example vehicle
        ]);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <PageTemplate>
        <main className="flex flex-col items-center mb-4   "> 
<header className=" ml-[-34rem] mx-0 p-0 mb-4 mt-4">
  <h1 className="text-4xl font-bold  text-base-content">Account Management</h1>
  <p className="text-gray-400">View and manage your personal information, vehicles, and reservation history.</p>
</header>
<div className="flex flex-row items-start">

<article className="text-base-content p-8 rounded-[0.5rem] bg-base-200 w-[757px] "> 




 <h2 className="text-3xl font-bold text-base-content mb-4">Personal Information</h2>

 <form>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
  
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm  text-base-content">Full name</h4>
      <Input name="fullName" value="fullName" type="text" className="text-base-content bg-primary rounded-[0.25rem] "  />
    </div>
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm  text-base-content">Email Address</h4>
      <Input name="email" value="email" type="text" className="text-base-content bg-primary rounded-[0.25rem] " />
    </div>
     <div className="flex flex-col col-span-2 gap-y-2">
      <h4 className="text-sm  text-base-content">Phone Number</h4>
      <Input name="phone" value="phone" type="text" className="w-full text-base-content bg-primary rounded-[0.25rem] " />
    </div>
      
    <div className="flex justify-end col-span-2">
      <Button type="submit" className="text-base-content bg-accent rounded-sm  w-50 " value="Update Information" />
  
    </div>
  </section>
 </form>

  <h2 className="text-3xl font-bold text-base-content  mb-4" >Change Password</h2>
 <form>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm  text-base-content">Current Password</h4>
      <Input name="currentPassword" value="currentPassword" type="text" className="text-base-content bg-primary rounded-[0.25rem] h-10" placeholder="Enter current password" />
    </div>
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm  text-base-content">New Password</h4>
      <Input name="newPassword" value="newPassword" type="text" className="text-base-content bg-primary rounded-[0.25rem] h-10" placeholder="Enter new password" />
    </div>
     <div className="flex flex-col col-span-2 gap-y-2">
      <h4 className="text-sm  text-base-content">Confirm New Password</h4>
      <Input name="confirmNewPassword" value="confirmNewPassword" type="text" className="text-base-content bg-primary rounded-[0.25rem] h-10" placeholder="Confirm new password" />
    </div>
     
    <div className="flex justify-end col-span-2">
        <Button type="submit" className="text-base-content bg-accent rounded-sm h-10 w-50 " value="Change Password" />
 </div>

 
 </section>
 </form>
 <h2 className="text-3xl font-bold text-base-content mb-4 ">Registered Vehicles</h2>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
 {vehicles.length === 0 ? (
  <div className="col-span-2 text-base-content">No vehicles registered.</div>
) : (
  vehicles.map((vehicle, idx) => (
    <div key={idx} className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20">
      <div className="flex flex-row items-center justify-between h-20 w-full px-4">
        {editIdx === idx ? (
          <div className="flex flex-row items-center w-full">
            <input
              type="text"
              value={editBrand}
              onChange={(e) => setEditBrand(e.target.value)}
              className="mr-2 px-2 py-1 rounded"
              placeholder="Brand"
            />
            <input
              type="text"
              value={editRegNum}
              onChange={(e) => setEditRegNum(e.target.value)}
              className="mr-2 px-2 py-1 rounded"
              placeholder="Registration"
            />
            <Button
              type="button"
              className="text-base-content bg-accent rounded-sm h-10 w-20 "
              onClick={handleEditSave}
              value="Save"
            />
           
            <Button
              type="button"
              className="text-base-content bg-gray-400 rounded-sm h-10 w-20 ml-2 "
              onClick={handleEditCancel}
              value="Cancel"
            />
            
          </div>
        ) : (
          <>
            <span className="font-bold">{vehicle.brand}</span>
            <span className="ml-4">{vehicle.registration_number}</span>
            <div className="flex flex-row items-center">
              <img
                src="/pencil.png"
                alt="edit"
                className="w-6 h-6 mr-2 cursor-pointer"
                onClick={() => handleEditClick(idx)}
              />
              <img
                src="/bin.png"
                alt="delete"
                className="w-6 h-6 mr-6 cursor-pointer"
                onClick={() => handleDeleteVehicle(vehicle.registration_number)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  ))
)}
  <div className="flex flex-col col-span-2 gap-y-2">
    <button
      type="button"
      className="border-2 border-dashed border-base-content rounded-[0.25rem] px-6 py-3 text-base-content flex items-center justify-center w-full"
    >
      + Add New Vehicle
    </button>
  </div>
</section>

  <h2 className="text-3xl font-bold  mb-4 mt-6 text-base-content">Manage Account</h2>
 <form>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
    <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20">
    
     <div className="flex items-center justify-start col-span-2 h-20 ml-4">
  <input type="submit" className="text-base-content bg-gray-700 rounded-sm h-10 w-40 bg-red-600 pd-10" value="Delete account" />
   <h4 className="text-sm m-5 text-base-content">be aware that this action is permanent</h4>
</div>
    </div>
    

 
 </section>
 </form>
  <section className="flex items-center justify-center col-span-2 h-20 ml-4">
  <input type="submit" className="text-base-content bg-gray-700 rounded-sm h-10 w-40 bg-red-600 pd-10" value="Logout" />

</section>



</article>
<nav className="flex items-center justify-between  ml-5">
<article className="text-base-content p-8 rounded-[0.5rem] bg-secondary w-[362px] h-[800px]"> 




 <h2 className="text-3xl font-bold  mb-6">Reservation History</h2>
 <form>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
    
       
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] w-[306px] h-[92px]">

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] w-[306px] h-[92px]">
    

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] w-[306px] h-[92px]">
    

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] w-[306px] h-[92px]">

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] w-[306px] h-[92px]">

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] w-[306px] h-[92px]">

    </div>
     
    <div className="flex justify-end col-span-2">
        <Button type="submit" className=" text-base-content bg-accent rounded-sm h-10 w-50 " value="View all History" />
 </div>

 
 </section>
 </form></article>
</nav>
</div>

</main>
    </PageTemplate>
  );
}