import React, { ReactNode } from 'react'

function PageHeader({children}: {children: ReactNode}) {
  return (
    <h1 className='text-3xl'>{children}</h1>
  )
}

export default PageHeader