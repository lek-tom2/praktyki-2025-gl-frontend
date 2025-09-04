import React, { ReactNode } from 'react'
import NavbarTemplate from './NavbarTemplate'

type PageTemplateProps = {
  children: ReactNode
}

const PageTemplate = ({children}:PageTemplateProps) => {
  return (
    <div className='bg-primary w-screen h-screen'>
    <NavbarTemplate/>
    <main>{children}</main>
    {/* <FooterTemplate/> */}
    </div>
  )
}

export default PageTemplate