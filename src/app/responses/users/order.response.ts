export interface OrderResponse {
    id: number;
    email: string;
    address: string;
    note: string;
    user_id: number;
    full_name: string;
    phone_number: string;
    order_date: Date;
    total_money: number;
    shipping_method: string;
    payment_method: string;
    order_details: {
        id: number;
        quantity: number;
        price: number;
        thumbnail: string;
        order_id: number;
        product_id: number;
        product_name: string;
        total_price: number;
    }[];
}