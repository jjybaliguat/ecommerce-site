"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DeleteIcon, PlusCircleIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { addProduct } from "../../_actions/products";
import { formatNumber } from "@/lib/formatters";

interface SpecProps {
    key: string
    value: string
}
interface VariantProps {
    name: string
    price: number | undefined
    imagePath: File | null
    isAvailableForPurchase: boolean | true
}

export function ProductForm() {
    const [specs, setSpecs] = useState<SpecProps[]>([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState<number>()
    const [description, setDescription] = useState('')
    const [imagePath, setImagePath] = useState<File | null>()
    const [variants, setVariants] = useState<VariantProps[]>([])
    const [hasVariants, setHasVariants] = useState(false)
    

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        const formData = new FormData()
        formData.set("name", name)
        formData.set("price", JSON.stringify(price))
        formData.set("description", description)
        formData.set("specs", JSON.stringify(specs))
        const variantsData = variants.map(({imagePath, ...rest})=>rest)
        formData.set("variants", JSON.stringify(variantsData))
        variants.forEach((variant, index) => {
            if (variant.imagePath) {
                formData.append(`image-[${index}]`, variant.imagePath);
            }
          });
        imagePath && formData.set("imagePath", imagePath)
        addProduct(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-8">
                <div className="flex gap-2 lg:items-center flex-col lg:flex-row">
                    <div className="space-y-2 flex-grow">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            name="price" 
                            value={price}
                            onChange={(e)=>setPrice(Number(e.target.value) || undefined)}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="imagePath">Image</Label>
                    <Input type="file" name="imagePath" id="imagePath" required
                    onChange={(e)=>{
                        if(e.target.files) {
                            setImagePath(e.target.files[0])
                        }
                    }}
                     />
                </div>
                <div className="space-y-2">
                    <Label className="font-bold">Specs</Label>
                    <div className="flex flex-col gap-2">
                        {specs?.map((spec, index) => (
                            <div key={index} className="relative flex gap-2 items-center">
                                <div className="space-y-2">
                                    <Label htmlFor={`key${index}`}>Key</Label>
                                    <Input id={`key${index}`} type="text"
                                    name={`speckey${index}`}
                                     value={spec.key} onChange={(e)=>{
                                        const newSpecs = [...specs]
                                        newSpecs[index].key = e.target.value
                                        setSpecs(newSpecs)
                                    }} required/>
                                </div>
                                <div className="space-y-2 flex-grow mr-12">
                                    <Label htmlFor={`value${index}`}>Value</Label>
                                    <Input id={`value${index}`} type="text"
                                    name={`specvalue${index}`}
                                    value={spec.value} onChange={(e) =>{
                                        const newSpecs = [...specs]
                                        newSpecs[index].value = e.target.value
                                        setSpecs(newSpecs)
                                    }} required/>
                                </div>
                                <Button
                                className="absolute bottom-0 right-0"
                                type="button" size="icon" variant="destructive"
                                onClick={()=>{
                                    const newSpecs = specs.filter((_, specIndex)=>specIndex !== index)
                                    setSpecs(newSpecs)
                                }}>
                                    <DeleteIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" size="icon" type="button" onClick={()=>setSpecs([...specs, {key: '', value: ''}])}>
                        <PlusCircleIcon className="h-6 w-6 text-primary" />
                    </Button>
                </div>
                <div className="space-y-2">
                    <h1 className="font-bold">Variants</h1>
                    {variants?.map((variant, index) => (
                        <div key={index} className="space-y-2">
                            <div className="relative flex gap-2 items-center">
                                <div className="space-y-2 flex-grow">
                                    <Label htmlFor={`variant${index}`}>Name</Label>
                                    <Input type="text" id={`variant${index}`} 
                                    value={variant.name} 
                                    onChange={(e)=>{
                                        const newVariant = [...variants]
                                        newVariant[index].name = e.target.value
                                        setVariants(newVariant)
                                    }} required/>
                                </div>
                                <div className="space-y-2 mr-12">
                                    <Label htmlFor={`price${index}`}>Price</Label>
                                    <Input type="number" id={`price${index}`} value={variant.price} onChange={(e)=>{
                                        const newVariant = [...variants]
                                        newVariant[index].price = Number(e.target.value) == 0? undefined : Number(e.target.value)
                                        setVariants(newVariant)
                                    }} required/>
                                </div>
                                <Button
                                    className="absolute bottom-0 right-0"
                                    type="button" size="icon" variant="destructive"
                                    onClick={()=>{
                                        const newVariants = variants.filter((_, variantIndex)=>variantIndex !== index)
                                        setVariants(newVariants)
                                    }}>
                                        <DeleteIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`image${index}`}>Image</Label>
                                <Input type="file" id={`image${index}`
                                }
                                    onChange={(e)=>{
                                        const newVariants = [...variants]
                                        if(e.target.files){
                                            newVariants[index].imagePath = e.target.files[0]
                                        }
                                        setVariants(newVariants)
                                    }}
                                 required/>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" type="button" onClick={()=>setVariants([...variants, {name: '', price: undefined, imagePath: null, isAvailableForPurchase: true}])}
                        size="icon">
                        <PlusCircleIcon className="h-6 w-6 text-primary" />
                    </Button>
                </div>
                {/* <div className="relative h-[100px] w-[100px]">
                    <Image 
                        src={"/products/d6dc04c4-27df-43e0-8294-51813f5d9e7e-jl.jpg"}
                        alt="product image"
                        fill
                        
                    />
                </div> */}
            <Button type="submit" className="">Save</Button>
        </form>
    )
}