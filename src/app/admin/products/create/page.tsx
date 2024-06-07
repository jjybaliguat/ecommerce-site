import BackButton from "../../_components/BackButton"
import PageHeader from "../../_components/PageHeader"

export default function CreateProductPage(){
    return (
        <>
        <div className="flex items-center gap-4">
            <BackButton>Back</BackButton>
            <PageHeader>Create Product</PageHeader>
        </div>
        </>
    )
}