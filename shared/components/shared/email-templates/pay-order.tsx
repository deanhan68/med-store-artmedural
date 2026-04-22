import React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
  items: any[];
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
  items,
}) => {
  // 1. Считаем чистую стоимость товаров (как в сайтбаре "Стоимость товаров")
  // Мы берем цену каждого товара, но чтобы показать "цену до скидки", 
  // нам нужно либо иметь её в базе, либо высчитать от обратного.
  // Так как в сайтбаре у тебя 6073 - это цена ДО скидки, считаем её:
  const itemsPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const deliveryPrice = 250; // Фиксированная доставка
  
  // 2. Скидка 15% (как на твоем скриншоте)
  // Считаем её честно от суммы товаров
  const discountAmount = Math.round(itemsPrice * 0.15);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', padding: '20px' }}>
      <h1 style={{ fontSize: '24px' }}>Заказ №{orderId}</h1>
      <p>Спасибо за заказ! Детали вашего чека:</p>
      
      <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ textAlign: 'left', color: '#888', fontSize: '14px' }}>
            <th style={{ paddingBottom: '10px' }}>Наименование</th>
            <th style={{ paddingBottom: '10px' }}>Кол-во</th>
            <th style={{ paddingBottom: '10px' }}>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
              <td style={{ padding: '12px 0' }}>{item.productItem.product.name}</td>
              <td>{item.quantity} шт.</td>
              <td>{item.price * item.quantity} ₽</td> 
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f6fff6', 
        border: '1px solid #e0f2f1', 
        borderRadius: '10px' 
      }}>
        {/* Стоимость товаров как в сайтбаре */}
        <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
          Стоимость товаров: <b>{itemsPrice} ₽</b>
        </p>
        
        {/* Доставка как в сайтбаре */}
        <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
          Доставка: <b>{deliveryPrice} ₽</b>
        </p>

        {/* Скидка 15% зеленая */}
        <div style={{ marginTop: '10px' }}>
          <div style={{ 
            display: 'inline-block', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '4px 10px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            fontWeight: 'bold' 
          }}>
            СКИДКА 15%: -{discountAmount} ₽
          </div>
        </div>
        
        {/* Итоговая цена (totalAmount из базы) */}
        <h2 style={{ margin: '15px 0 0 0', fontSize: '22px', color: '#000' }}>
          Итого к оплате: {totalAmount} ₽
        </h2>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href={paymentUrl} style={{ 
            display: 'inline-block',
            backgroundColor: '#000', 
            color: '#fff', 
            padding: '15px 30px', 
            textDecoration: 'none', 
            borderRadius: '8px',
            fontWeight: '600'
          }}>
          Оплатить заказ онлайн
        </a>
      </div>
    </div>
  );
};