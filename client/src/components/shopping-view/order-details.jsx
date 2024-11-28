import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";




function ShoppingOrderDetailsView({orderDetails}){

    const {user} = useSelector(state => state.auth) 
   
    return(
        <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
            <div className="grid gap-2">
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Order ID</p>
                    <Label>{orderDetails?._id}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Order Date</p>
                    <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                </div>
               
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Order Price</p>
                    <Label>${orderDetails?.totalAmount}</Label>
                </div>

                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">paymentMethod</p>
                    <Label>{orderDetails?.paymentMethod}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">paymentStatus</p>
                    <Label>{orderDetails?.paymentStatus}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Order Status</p>
                    <Label>
                    <Badge 
                        className={`py-1 px-3 ${
                            orderDetails?.status === 'confirmed' 
                                ? 'bg-green-500' : 'bg-black'}`}>
                                       
                                    </Badge>
                    </Label>
                </div>
            </div>
            <Separator/>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <div className="font-medium">Order Details</div>
                    <ul className="grid gap-3">
                        {
                          orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                          orderDetails?.cartItems.map((item) =>  (<li className="flex items-center judtify-between">
                            <span>Title: {item.title}</span>
                            <span>Quantity: {item.quantity}</span>
                            <span>Price: ${item.price}</span>
                        </li> )) 
                        : null
                        }
                       
                        
                    </ul>
                </div>
            </div>
            <div className="grid gap-4">
            <div className="grid gap-2">
            <div className="font-medium">
                Shipping Info
                </div>
                <div className="grid gap-0.5 text-muted-foreground">
                    <span>{user.userName}</span>
                    <span>{orderDetails?.addressInfo?.address}</span>
                    <span>{orderDetails?.addressInfo?.city}</span>
                    <span>{orderDetails?.addressInfo?.pincode}</span>
                    <span>{orderDetails?.addressInfo?.phone}</span>
                    <span>{orderDetails?.addressInfo?.notes}</span>
                </div>
                </div>
            </div>
       </div>
    </DialogContent>
    );
}

export default ShoppingOrderDetailsView;