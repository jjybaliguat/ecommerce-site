import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import db from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'

async function getUserData() {
    const userCount = await db.user.count({
        where: {
            orders: {
                some : {
                    paymentStatus: 'paid'
                }
            }
        }
    })

    return userCount
}

async function getProductsData(){
    const [activeProductsCount, inactiveProductsCount] = await Promise.all([
        db.products.count({where: {isAvailableForPurchase: true}}),
        db.products.count({where: {isAvailableForPurchase: false}})
    ])

    return {
        activeProductsCount,
        inactiveProductsCount
    }
}

async function getOrdersData(){
    const res = await db.order.aggregate({
        _sum : { amountToPay : true },
        _count : true,
        where : {
            paymentStatus : "paid"
        }
    })

    return {
        amount: res._sum.amountToPay || 0,
        numberOfSales : res._count
    }
}
  

async function AdminDashboard() {
    const [ordersData, userCount, productData] = await Promise.all([
        getOrdersData(),
        getUserData(),
        getProductsData()
    ])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <DashboardCard 
            title="Sales" 
            description={`${formatNumber(ordersData.numberOfSales)} total sales`}
            content={formatCurrency(ordersData.amount)}
        />
        <DashboardCard 
            title="Clients" 
            description="This is your total clients as of now with atleast one successfull order."
            content={formatNumber(userCount)}
        />
        <DashboardCard 
            title="Active Products" 
            description={`${productData.inactiveProductsCount} inactive`}
            content={formatNumber(productData.activeProductsCount)}
        />
    </div>
  )
}

export default AdminDashboard

type DashboardCardProps = {
    title: String
    description: String
    content: String
}

function DashboardCard({title, description, content} : DashboardCardProps){
    return (
        <Card className='shadow-md'>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{content}</p>
        </CardContent>
        {/* <CardFooter>
            <p>Card Footer</p>
        </CardFooter> */}
        </Card>
    )
}