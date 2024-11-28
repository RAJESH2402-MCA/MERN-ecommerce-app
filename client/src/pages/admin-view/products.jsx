import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetTitle, Sheet, SheetHeader } from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch } from "react-redux";
import { deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useSelector } from "react-redux";
import { addNewProduct } from "@/store/admin/products-slice";
import { toast, useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";
function AdminProducts(){

    const initialFormData = {
        image : null,
        title : '',
        description : '',
        category : '',
        brand : '',
        price : '',
        salePrice : '',
        totalStock : '',
    }

    const[openCreateProductsDialog,setOpenCreateProductsDialog] = useState(false);    
    const[formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    
    const [upLoadImageUrl, setUploadImageUrl] = useState('')
    const [imageLoadingState, setImageLoadingState] = useState(false)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const {productList} = useSelector(state=>state.adminProducts)
    const dispatch = useDispatch()
    const {toast} = useToast()

    
    function onSubmit(event) {
        event.preventDefault();

        currentEditedId !== null ?
        dispatch(editProduct({
            id : currentEditedId,
            formData,
        })).then((data)=>{
            console.log(data, "edit");

            if(data?.payload.success) {
                dispatch(fetchAllProducts());
                setFormData(initialFormData);
                setOpenCreateProductsDialog(false);
                setCurrentEditedId(null)
            }
        }) 
        : dispatch(addNewProduct({
            ...formData,
            image : upLoadImageUrl
        })).then((data)=>{
            console.log(data);
            if(data?.payload?.success){
                dispatch(fetchAllProducts());
                setImageFile(null);
                setOpenCreateProductsDialog(false);
                setFormData(initialFormData)
                toast({
                    title : 'product add successfully'
                })
            }
        })
    }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

    function isFormValid(){
        return Object.keys(formData)
            .map((key)=> formData[key] !== "")
            .every((item) => item);
    }

    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[dispatch])

    console.log(formData,"productList");
    return (
      <Fragment>
        <div className="mb-5 w-full flex justify-end">
            <Button onClick={() => setOpenCreateProductsDialog(true)} >Add New Product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
            productList && productList.length > 0
            ? productList.map((productItem)=>(
                <AdminProductTile 
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete} />
            )) : null
            }
        </div>
        <Sheet 
            open={openCreateProductsDialog}
            onOpenChange={() => {
                setOpenCreateProductsDialog(false);
                setCurrentEditedId(null);
                setFormData(initialFormData);
                setCurrentEditedId(null)
        }}>
            <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>
                        {
                            currentEditedId !== null ?
                            'Edit Product' : 'Add new Product'
                        }
                    </SheetTitle>
                </SheetHeader>
                <ProductImageUpload 
                    imageFile={imageFile} 
                    setImageFile={setImageFile} 
                    upLoadImageUrl={upLoadImageUrl} 
                    setUploadImageUrl={setUploadImageUrl} 
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    isEditMode={currentEditedId !== null}
                />
                <div className="py-6">
                    <CommonForm 
                    onSubmit={onSubmit}
                    formData={formData} 
                    setFormData={setFormData} 
                    buttonText={currentEditedId !== null ? "Edit" : "Add" }
                    formControls={addProductFormElements}
                    isBtnDisabled={!isFormValid()}
                    />
                </div>
            </SheetContent>

        </Sheet>
      </Fragment>
    )
}

export default AdminProducts;