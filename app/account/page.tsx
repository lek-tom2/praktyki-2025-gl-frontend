import PageTemplate from "@/templates/PageTemplate";
import Image from "next/image";

export default function Home() {
  return (
    <PageTemplate>
        <div className="flex flex-col items-center mb-4   ">  {/* all page div*/}
<div className = "w-full max-w-4xl mx-auto p-8"  > {/* all account management div*/}
    <h1 className="text-4xl font-bold  text-white justify-start">Account Management</h1>
    <p className="text-gray-400">View and manage your personal information, vehicles, and reservation history.</p>
</div>
<div className="flex flex-row items-start">

<div className="text-white p-8 rounded-[0.5rem] bg-secondary w-full max-w-4xl mx-auto"> {/* all form div*/}




 <h2 className="text-3xl font-bold  mb-6">Personal Information</h2>
 <form>
<div className="grid grid-cols-2 gap-x-8 gap-y-4">
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm ">Full name</h4>
      <input type="text" className="text-white bg-primary rounded-[0.25rem] h-10"  />
    </div>
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm">EmailAddress</h4>
      <input type="text" className="text-white bg-primary rounded-[0.25rem] h-10" />
    </div>
     <div className="flex flex-col col-span-2 gap-y-2">
      <h4 className="text-sm">Phone Number</h4>
      <input type="text" className="text-white bg-primary rounded-[0.25rem] h-10" />
    </div>
      
    <div className="flex justify-end col-span-2">
        <input type="submit" className="text-white bg-gray-700 rounded-sm h-10 w-50" value="Update Information" />
 </div> 

 
 </div>
 </form>

  <h2 className="text-3xl font-bold  mb-6 mt-20">Change Password</h2>
 <form>
<div className="grid grid-cols-2 gap-x-8 gap-y-4">
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm ">Current Password</h4>
      <input type="text" className="text-white bg-primary rounded-[0.25rem] h-10"  placeholder="Enter current password" />
    </div>
    <div className="flex flex-col gap-y-2">
      <h4 className="text-sm">New Password</h4>
      <input type="text" className="text-white bg-primary rounded-[0.25rem] h-10" placeholder="Enter new password" />
    </div>
     <div className="flex flex-col col-span-2 gap-y-2">
      <h4 className="text-sm">Confirm New Password</h4>
      <input type="text" className="text-white bg-primary rounded-[0.25rem] h-10" placeholder="Confirm new password" />
    </div>
     
    <div className="flex justify-end col-span-2">
        <input type="submit" className="text-white bg-gray-700 rounded-sm h-10 w-50" value="Update Information" />
 </div> 

 
 </div>
 </form>
 <h2 className="text-3xl font-bold  mb-6 mt-20">Registered Vehicles</h2>
 <form>
<div className="grid grid-cols-2 gap-x-8 gap-y-4">
    <div className="flex flex-col col-span-2 gap-y-2">
    
      <input type="text" className="text-white bg-primary rounded-[0.25rem] h-20 "   />
    </div>
    <div className="flex flex-col col-span-2 gap-y-2">
        <input type="submit" value=" +  Add New Vehicle" className="border-2 border-dashed border-base-200 rounded-[0.25rem] px-6 py-3 text-gray-400 flex items-center justify-center"
   />
 </div> 

 
 </div>
 </form>
  <h2 className="text-3xl font-bold  mb-6 mt-6">Manage Account</h2>
 <form>
<div className="grid grid-cols-2 gap-x-8 gap-y-4">
    <div className="flex flex-col col-span-2 gap-y-2 text-white bg-primary rounded-[0.25rem] h-20">
    
     <div className="flex items-center justify-start col-span-2 h-20 ml-4">
  <input type="submit" className="text-white bg-gray-700 rounded-sm h-10 w-40 bg-red-600 pd-10" value="Delete account" />
   <h4 className="text-sm m-5 ">be aware that this action is permanent</h4>
</div>
    </div>
    

 
 </div>
 </form>
  <div className="flex items-center justify-center col-span-2 h-20 ml-4">
  <input type="submit" className="text-white bg-gray-700 rounded-sm h-10 w-40 bg-red-600 pd-10" value="Logout" />

</div>



</div>
<nav className="flex items-center justify-between  ml-5">
<div className="text-white p-8 rounded-[0.5rem] bg-secondary w-full max-w-4xl mx-auto"> {/* all nav div*/}




 <h2 className="text-3xl font-bold  mb-6">Reservation History</h2>
 <form>
<div className="grid grid-cols-2 gap-x-8 gap-y-4">
    
       <div className="flex flex-col col-span-2 gap-y-2">
    
      <input type="text" className="text-white bg-primary rounded-[0.25rem] h-20 "   />
    </div>
    <div className="flex justify-end col-span-2">
        <input type="submit" className="text-white bg-gray-700 rounded-sm h-10 w-50" value="Update Information" />
 </div> 

 
 </div>
 </form></div>
</nav>
</div>

</div>
    </PageTemplate>
  );
}
