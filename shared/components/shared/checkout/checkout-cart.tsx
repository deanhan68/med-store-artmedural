import { getCartItemDetails } from "@/shared/lib";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import { GigienType, GigienVolue } from "@/shared/constants/gigien";
import { CartStateItem } from "@/shared/lib/get-cart-details";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem: (id: number) => void;
    className?: string;
   
}

export const CheckoutCart: React.FC<Props> = ({ items, onClickCountButton, removeCartItem, className }) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-8 divide-y divide-gray-300">
              {items.length > 0 ? (
                items.map((item) => (
                  <CheckoutItem
                    key={item.id}
                    className="pb-6"
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(
                      item.countProduct,
                      item.productType as GigienType,
                      item.productSize as GigienVolue
                    )}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    disabled={item.disabled}
                    onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                    onClickRemove={() => removeCartItem(item.id)}
                  />
                ))
              ) : (
                <p className="text-gray-400">Корзина пуста</p>
              )}
            </div>
        
          </WhiteBlock>
  );
};