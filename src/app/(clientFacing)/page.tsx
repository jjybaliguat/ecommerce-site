import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
   <>
    <h1>Hello</h1>
    <Button variant="outline">
     View All <ChevronRight className="ml-2 h-4 w-4" />
    </Button>
   </>
  );
}
