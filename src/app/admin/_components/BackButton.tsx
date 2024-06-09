"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function BackButton({children}: {children: ReactNode}){
    const router = useRouter()
    return (
        <Button
            onClick={()=>router.back()}
            variant="outline"
        >
            <ArrowLeft className="w-4 h-4 mr-2"/>
            {children}
        </Button>
    )
}