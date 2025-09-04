import React, { ReactNode } from 'react'
import NavbarTemplate from './NavbarTemplate'
import FooterTemplate from './FooterTemplate'

type PageTemplateProps = {
  children: ReactNode
}

const PageTemplate = ({children}:PageTemplateProps) => {
  return (
    <div className='flex flex-col'>
    <NavbarTemplate/>
    <main>{children}</main>
    <FooterTemplate/>
    </div>
  )
}

export default PageTemplate