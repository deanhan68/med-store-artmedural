export interface CartItemProps {
    id: number;
    imageUrl: string;
    details: string; 
    disabled?: boolean;
    name: string;
    price: number;
    quantity: number;
}