import { cn } from "@/shared/lib/utils";


interface Props {
    value: number;
    className?: string;
}


export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
    return <h2 className={cn('fold-bold ml-1', className)}>{value} ₽</h2>

};