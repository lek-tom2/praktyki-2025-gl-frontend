import React from 'react'
import useTranslation from "@/lang/useTranslation";

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col justify-center items-center min-h-[calc(100vh-64px-48px)] bg-gradient-to-b from-[#333446] to-[#7F8CAA]'>
      <div className='flex flex-row'>
        <h1 className='font-bold mb-10 text-7xl mr-3 text-white'>
          {t("landing.findParking")}
        </h1>
        <h1 className='font-bold mb-10 text-7xl text-[#16DB65]'>
          {t("landing.simplified")}
        </h1>
      </div>
      <p className='text-m text-white'>
        {t("landing.reserveDescription")}
      </p>
    </div>
  )
}

export default Welcome