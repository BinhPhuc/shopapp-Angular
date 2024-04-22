export class OrderDTO {
    user_id: number;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    total_money: number;
    shipping_method: string;
    shipping_address: string;
    shipping_date: Date;
    payment_method: string;
    cart_items: {product_id: number, quantity: number}[];
    constructor(data: any) {
        this.user_id = data.user_id;
        this.full_name = data.full_name;
        this.email = data.email;
        this.phone_number = data.phone_number;
        this.address = data.address;
        this.note = data.note;
        this.total_money = data.total_money;
        this.shipping_method = data.shipping_method;
        this.shipping_address = data.shipping_address;
        this.shipping_date = data.shipping_date;
        this.payment_method = data.payment_method;
        this.cart_items = data.cart_items;
    }
}