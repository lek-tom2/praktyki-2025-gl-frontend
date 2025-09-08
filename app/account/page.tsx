"use client";
import PageTemplate from "@/templates/PageTemplate";
import Image from "next/image";
import Input from "@/components/input/input";
import Button from "@/components/button";

export default function Home() {
  return (
    <PageTemplate>
        <main className="flex flex-col items-center mb-4   ">  {/* all page div*/}
<header className = "w-full max-w-4xl mx-auto p-8"  > {/* all account management div*/}
    <h1 className="text-4xl font-bold mt-12 text-base-content justify-start">Account Management</h1>
    <p className="text-gray-400">View and manage your personal information, vehicles, and reservation history.</p>
</header>
<div className="flex flex-row items-start">

<article className="text-base-content p-8 rounded-[0.5rem] bg-base-200 w-full max-w-4xl mx-auto"> {/* all form div*/}




 <h2 className="text-3xl font-bold text-base-content mb-6">Personal Information</h2>

 <form>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
  
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm  text-base-content">Full name</h4>
      <Input name="fullName" value="fullName" type="text" className="text-base-content bg-primary rounded-[0.25rem] h-10"  />
    </div>
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm  text-base-content">Email Address</h4>
      <Input name="email" value="email" type="text" className="text-base-content bg-primary rounded-[0.25rem] h-10" />
    </div>
     <div className="flex flex-col col-span-2 gap-y-2">
      <h4 className="text-sm  text-base-content">Phone Number</h4>
      <Input name="phone" value="phone" type="text" className="w-full text-base-content bg-primary rounded-[0.25rem] h-10" />
    </div>
      
    <div className="flex justify-end col-span-2">
        <input type="submit" className="text-base-content bg-accent rounded-sm h-10 w-50" value="Update Information" />
 </div>

 
 </section>
 </form>

  <h2 className="text-3xl font-bold text-base-content mb-6 mt-20" >Change Password</h2>
 <form>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm  text-base-content">Current Password</h4>
      <input type="text" className="text-base-content bg-primary rounded-[0.25rem] h-10"  placeholder="Enter current password" />
    </div>
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm  text-base-content">New Password</h4>
      <input type="text" className="text-base-content bg-primary rounded-[0.25rem] h-10" placeholder="Enter new password" />
    </div>
     <div className="flex flex-col col-span-2 gap-y-2">
      <h4 className="text-sm  text-base-content">Confirm New Password</h4>
      <input type="text" className="text-base-content bg-primary rounded-[0.25rem] h-10" placeholder="Confirm new password" />
    </div>
     
    <div className="flex justify-end col-span-2">
        <input type="submit" className="text-base-content bg-accent rounded-sm h-10 w-50 " value="Change Password" />
 </div> 

 
 </section>
 </form>
 <h2 className="text-3xl font-bold text-base-content mb-6 mt-20">Registered Vehicles</h2>
 <form>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
  
    <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20 ">

  <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20 relative">
   <div
    className="absolute"
    style={{
      width: "24px",
      height: "24px",
      left: "493px", 
            top: "26px",
      background: "url('/bin.jpg') no-repeat center/contain" 
    }}
  />
</div>   </div>

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
  <h2 className="text-3xl font-bold  mb-6 mt-6 text-base-content">Manage Account</h2>
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
<article className="text-base-content p-8 rounded-[0.5rem] bg-secondary w-full max-w-4xl mx-auto"> {/* all nav div*/}




 <h2 className="text-3xl font-bold  mb-6">Reservation History</h2>
 <form>
<section className="grid grid-cols-2 gap-x-8 gap-y-4">
    
       <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20">
    

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20">
    

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20">
    

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20">
    

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20">
    

    </div>
     <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20">
    

    </div>
    <div className="flex justify-end col-span-2">
        <input type="submit" className="text-base-content bg-accent rounded-sm h-10 w-50" value="View all History" />
 </div> 

 
 </section>
 </form></article>
</nav>
</div>

</main>
    </PageTemplate>
  );
}
