import BackButton from "../../_components/BackButton"
import PageHeader from "../../_components/PageHeader"
import { ProductForm } from "../_components/ProductForm"

export default function CreateProductPage(){
    return (
        <>
        <div className="flex items-center gap-2">
            <BackButton>Back</BackButton>
            <PageHeader>Create Product</PageHeader>
        </div>
            <ProductForm />
        </>
    )
}