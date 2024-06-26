"use server"

import db from "@/db/db";
import fs from 'fs/promises'
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
    const currentVariants = JSON.parse(formData.get('variants') as string)
    
    const filteredKeys = Array.from(formData.keys()).filter((key) =>
        key.includes("image-")
      );
      
      const filteredImages = Array.from(formData.entries()).filter(([key]) => filteredKeys.includes(key)).map(([, value]) => value);
      const newVariants: any = [...currentVariants]
      const filePaths : any = []
      filteredImages.map(async (image: any, index: any)=>{
        await fs.mkdir("public/products", {recursive: true})
        const filePath = `/products/${crypto.randomUUID()}-${image.name}` 
        filePaths.push(filePath)
        await fs.writeFile(`public${filePath}`, Buffer.from(await image.arrayBuffer())) 
      })

      filteredImages.map((_, index)=>{
        newVariants[index].imagePath = filePaths[index]
      })

      const file = formData.get('imagePath') as File
      await fs.mkdir("public/products", {recursive: true})
      const finalImagePath = `/products/${crypto.randomUUID()}-${file.name}`
      await fs.writeFile(`public${finalImagePath}`, Buffer.from(await file.arrayBuffer()))

    const rawFormData = {
        name: formData.get('name') as string,
        price: formData.get('price'),
        description: formData.get('description') as string,
        specs: JSON.parse(formData.get('specs') as string),
        variants: newVariants,
        imagePath: finalImagePath
    }
    // const finalFormData = new FormData()
    // finalFormData.set('name', JSON.stringify(rawFormData.name))
    // finalFormData.set('price', JSON.stringify(rawFormData.price))
    // finalFormData.set('description', JSON.stringify(rawFormData.description))
    // finalFormData.set('specs', JSON.stringify(rawFormData.specs))
    // finalFormData.set('variants', JSON.stringify(rawFormData.variants))
    // finalFormData.set('imagePath', JSON.stringify(rawFormData.imagePath))

    console.log(rawFormData)
    // console.log(formData)

    await db.products.create({data: {
        name: rawFormData.name,
        price: Number(rawFormData.price),
        description: rawFormData.description,
        imagePath: rawFormData.imagePath,
        specs: {
          create: rawFormData.specs.map((spec: { key: any; value: any; }) => ({
            key: spec.key,
            value: spec.value,
          })),
        },
        variants: {
          create: rawFormData.variants.map((variant: { name: any; price: any; imagePath: any; }, index: any)=>({
            name: variant.name,
            price: variant.price,
            imagePath: filePaths[index]
          }))
        }
    }})

    redirect("/admin/products")
}