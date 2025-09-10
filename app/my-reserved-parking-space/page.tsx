import PageTemplate from "@/templates/PageTemplate";
import Button from "@/components/button";

const MyReservedParkingSpacePage = () => {
  return (
    <PageTemplate>
      <div className="flex items-start justify-center mt-10 bg-base-100">
      
        <div className="flex gap-10">
     
          <div className="w-full max-w-[634px] pr-6 h-auto max-h-[723px] bg-base-200 flex flex-col pl-10 justify-start p-1 rounded-[0.5rem]">
            <h1 className="text-4xl font-bold mt-12 text-base-content">
              Your parking spot reservation
            </h1>
            <h4 className="text-gray-400">
              Selected Spot{" "}
              <span className="text-base-content">P-103, North Garage</span>
            </h4>

            <section>
              <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">
                Selected Date
              </h4>
              <div className="p-5 flex items-center justify-start bg-base-100 w-[512px] h-[56px] rounded-[0.5rem]">
                <p className="text-base-content">07/23/2025</p>
              </div>

              <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">
                Selected Time
              </h4>
              <div className="flex gap-10">
                <div className="p-5 flex items-center justify-start bg-base-100 w-[236px] h-[56px] rounded-[0.5rem]">
                  <p className="text-base-content">From 09:00AM</p>
                </div>
                <div className="p-5 flex items-center justify-start bg-base-100 w-[236px] h-[56px] rounded-[0.5rem]">
                  <p className="text-base-content">To 10:00AM</p>
                </div>
              </div>

              <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">
                Selected Vehicle
              </h4>
              <div className="p-5 flex items-center justify-start bg-base-100 w-[512px] h-[56px] rounded-[0.5rem]">
                <p className="text-base-content">Tesla Model 3</p>
              </div>

              <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">
                Reservation Duration
              </h4>
              <div className="p-5 flex items-center justify-between bg-base-100 w-[512px] h-[56px] rounded-[0.5rem]">
                <p className="text-base-content">Total time :</p>
                <span className="text-green-500 text-2xl font-bold">10h</span>
              </div>
            </section>

            <div className="flex justify-between w-[512px] mt-8 mb-8">
               <Button type="submit" className=" text-base-content bg-red-500 rounded-[0.5rem] h-10 w-50 " value="Raport an issue" />
               <Button type="submit" className=" text-base-content bg-accent rounded-[0.5rem] h-10 w-50 " value="Change your reservation" />
            </div>
          </div>

       
          <nav>
            <article className="text-base-content p-8 rounded-[0.5rem] bg-secondary w-[362px] max-h-[723px] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-6">Reservation History</h2>
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
                    <Button type="submit" className=" text-base-content bg-accent rounded-[0.5rem] h-10 w-full " value="View all History" />
                  </div>
                </section>
              </form>
            </article>
          </nav>
        </div>
      </div>
    </PageTemplate>
  );
};

export default MyReservedParkingSpacePage;
