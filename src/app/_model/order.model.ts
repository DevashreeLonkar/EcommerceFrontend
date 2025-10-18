import { Product } from "./product.model";


export interface MyOrderDetails{
    orderId: number;
    orderFullName: string;
    orderFullAddres: string;
    orderContactNumber: string;
    orderAlternameContactNumber: string;
    orderAmount: number;
    orderStatus: string;
    product: Product;
    user: any;
}