import React from 'react'
import PageHeader from '../_components/PageHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Products, ProductsTable } from './_components/ProductsTable'
import db from '@/db/db'

async function getProductsData(){
  try {
    const data: any = await db.products.findMany()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

async function ProductsPage() {
  const products: Products[] = await getProductsData()
  return (
    <>
      <div className=''>
        <div className='flex justify-between items-center gap-4'>
          <PageHeader>Products</PageHeader>
          <Button asChild>
            <Link href="/admin/products/create">Add Product</Link>
          </Button>
        </div>
        <ProductsTable products={products} />
      </div>
    </>
  )
}

export default ProductsPage