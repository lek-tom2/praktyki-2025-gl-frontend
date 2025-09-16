"use client";
import PageTemplate from "@/templates/PageTemplate";
import Image from "next/image";
import Input from "@/components/input/input";
import Button from "@/components/button";
import { useState } from "react";
export default function Home() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

 

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
    });
   
  };
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

   <h2 className="text-3xl font-bold text-base-content  mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <section className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h4 className="text-sm text-base-content">Current Password</h4>
              <Input
                name="currentPassword"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                type="password"
                className="text-base-content bg-primary rounded-[0.25rem] h-10"
                placeholder="Enter current password"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <h4 className="text-sm text-base-content">New Password</h4>
              <Input
                name="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                type="password"
                className="text-base-content bg-primary rounded-[0.25rem] h-10"
                placeholder="Enter new password"
              />
            </div>
            <div className="flex flex-col col-span-2 gap-y-2">
              <h4 className="text-sm text-base-content">Confirm New Password</h4>
              <Input
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
                type="password"
                className="text-base-content bg-primary rounded-[0.25rem] h-10"
                placeholder="Confirm new password"
              />
            </div>
     
    <div className="flex justify-end col-span-2">
        <Button type="submit" className="text-base-content bg-accent rounded-sm h-10 w-50 " value="Change Password" />
 </div>

 
 </section>
 </form>
 <h2 className="text-3xl font-bold text-base-content mb-4 ">Registered Vehicles</h2>
 <form>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
  
    <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20 ">

  <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20 relative">
   <div className="flex flex-row items-center justify-end h-20 w-full bg-primary rounded-[0.25rem] col-span-2">
  
  <img src="/pencil.png" alt="edit" className="w-6 h-6 mr-2" />
  <img src="/bin.png" alt="delete" className="w-6 h-6 mr-6" />
</div>
  </div>
</div>

    <div className="flex flex-col col-span-2 gap-y-2">
  <button
  type="button"
  className="border-2 border-dashed border-base-content rounded-[0.25rem] px-6 py-3 text-base-content flex items-center justify-center w-full"
>
  + Add New Vehicle
</button>
</div>

 
 </section>
 </form>
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