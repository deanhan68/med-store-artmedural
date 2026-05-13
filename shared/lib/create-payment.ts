import { PaymentData } from '@/@types/yookassa';
import axios from 'axios';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const apiKey = process.env.YOOKASSA_API_KEY;

  // Проверка прямо в коде, чтобы мы видели ошибку в логах, если ключей нет
  if (!shopId || !apiKey) {
    throw new Error(`[Create Payment] Missing credentials. ShopID: ${!!shopId}, APIKey: ${!!apiKey}`);
  }

  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
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
        return_url: process.env.YOOKASSA_CALLBACK_URL || 'https://med-store-artmedural.vercel.app/?paid',
      },
    },
    {
      headers: {
        'Idempotence-Key': Math.random().toString(36).substring(7),
        'Content-Type': 'application/json',
        // Передаем авторизацию через заголовок напрямую (это надежнее)
        Authorization: 'Basic ' + Buffer.from(`${shopId}:${apiKey}`).toString('base64'),
      },
    },
  );

  return data;
}