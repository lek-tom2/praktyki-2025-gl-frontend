import React, { ReactNode } from 'react'
import NavbarTemplate from './NavbarTemplate'

type PageTemplateProps = {
  children: ReactNode
}

const PageTemplate = ({children}:PageTemplateProps) => {
  return (
    <div className='bg-primary w-[100vw] h-[100vw]'>
    <NavbarTemplate/>
    <main>{children}</main>
    {/* <FooterTemplate/> */}
    </div>
  )
}

export default PageTemplate