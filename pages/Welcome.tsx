import React from "react";
import PageTemplate from "../templates/PageTemplate";

const Welcome = () => {
  return (
    <>
      <PageTemplate>
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px-48px)] bg-gradient-to-b from-primary to-secondary">
          <div className="flex flex-row">
            <h1 className="font-bold mb-10 text-7xl mr-3 text-base-300">
              Find Parking,
            </h1>
            <h1 className="font-bold mb-10 text-7xl text-neutral">
              Simplified
            </h1>
          </div>
          <p className="text-m text-info">
            Reserve your spot in advance and save time and money. Your seamless
            parking experience starts here.
          </p>
        </div>
      </PageTemplate>
    </>
  );
};

export default Welcome;
