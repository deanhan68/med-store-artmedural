import { Suspense } from "react";
import { CheckoutForm } from "./checkout-form";

// Эта строка — магическая кнопка "пропустить проверку при билде"
export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutForm />
    </Suspense>
  );
}




