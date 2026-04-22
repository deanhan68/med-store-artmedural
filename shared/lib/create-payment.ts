import { PaymentData } from '@/@types/yookassa';
import axios from 'axios';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        // Обязательно приводим к строке, иначе ЮKassa вернет ошибку
        value: details.amount.toFixed(2), 
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL || 'http://localhost:3000/?paid',
      },
    },
    {
      auth: {
        // ЛОГИН — это твой ShopID (из последнего скриншота)
        username: process.env.YOOKASSA_SHOP_ID as string,
        // ПАРОЛЬ — это твой секретный ключ (API-KEY)
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        'Idempotence-Key': Math.random().toString(36).substring(7),
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
}