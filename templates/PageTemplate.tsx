import React, { ReactNode } from 'react'
import NavbarTemplate from './NavbarTemplate'

type PageTemplateProps = {
  children: ReactNode
}

const PageTemplate = ({children}:PageTemplateProps) => {
  return (
    <div className='flex flex-col bg-primary w-[100vw] min-h-[calc(100vw-5rem-3rem)]'>
    <NavbarTemplate/>
    <main className='flex-1'>{children}</main>
    {/* <FooterTemplate/> */}
    </div>
  )
}

export default PageTemplate